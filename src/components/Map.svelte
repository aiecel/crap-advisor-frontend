<script lang="ts">
    import { onMount } from "svelte";
    import { restrooms } from "$lib/store/restroomsStore";
    import RestroomMarker from "./RestroomMarker.svelte";
    import type { YMap } from "@yandex/ymaps3-types";
    import { selectedRestroom } from "$lib/store/selectedRestroomStore";

    let map: YMap;
    let mapElement: HTMLElement;

    onMount(() => initMap());

    $: $selectedRestroom, centerOnSelectedRestroom(500);

    async function initMap() {
        ymaps3.ready.then(async () => {
            const { YMapZoomControl } = await ymaps3.import(
                "@yandex/ymaps3-controls@0.0.1"
            );

            map = new ymaps3.YMap(
                mapElement,
                {
                    location: { center: [49, 53], zoom: 10 },
                    behaviors: [
                        "drag",
                        "scrollZoom",
                        "pinchZoom",
                        "mouseTilt",
                        "mouseRotate",
                        "mouseTilt",
                        "dblClick",
                    ],
                },
                [
                    new ymaps3.YMapDefaultSchemeLayer({}),
                    new ymaps3.YMapControls({ position: "right" }, [
                        new YMapZoomControl({}),
                    ]),
                    new ymaps3.YMapDefaultFeaturesLayer({}),
                ]
            );

            centerOnSelectedRestroom();
        });
    }

    function centerOnSelectedRestroom(duration: number = 0) {
        if (map && $selectedRestroom) {
            map.setLocation({
                center: [
                    $selectedRestroom.location.longitude,
                    $selectedRestroom.location.latitude,
                ],
                duration,
            });
        }
    }
</script>

<svelte:head>
    <script
        src="https://api-maps.yandex.ru/3.0/?lang=ru_RU&amp;apikey=1979b9d5-98ad-4ff1-8015-c4de94371af1"
        type="text/javascript"
    >
    </script>
</svelte:head>

<div id="map" bind:this={mapElement}>
    {#if map}
        {#each $restrooms as restroom}
            <RestroomMarker {restroom} {map} />
        {/each}
    {/if}
</div>

<style>
    #map {
        position: absolute;
        z-index: -54;
        width: 100vw;
        height: 100vh;
    }
</style>
