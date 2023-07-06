<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { Restroom } from "$lib/model";
    import type { YMap, YMapMarker } from "@yandex/ymaps3-types";
    import { goto } from "$app/navigation";

    export let restroom: Restroom;
    export let map: YMap;

    let marker: YMapMarker;
    let markerElement: HTMLElement;

    onMount(() => {
        marker = new ymaps3.YMapMarker(
            {
                coordinates: [
                    restroom.location.longitude,
                    restroom.location.latitude,
                ],
            },
            markerElement
        );

        map.addChild(marker);
    });

    onDestroy(() => {
        if (marker) {
            map.removeChild(marker);
        }
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    id="marker-container"
    bind:this={markerElement}
    on:click={() => goto(`${restroom.id}`)}
>
    <p class="text outlined tooltip">{restroom.name ?? ""}</p>
    <img class="icon" src="restroom.png" alt={restroom.name} />
    <p class="text outlined">{restroom.rating ?? ""}</p>
</div>

<style>
    #marker-container {
        text-align: center;
        cursor: pointer;
        position: relative;
        top: -50px;
        left: -50%;
        transition: all 0.1s ease-in-out;
    }

    #marker-container:hover {
        transform: scale(1.1);
    }

    .icon {
        width: 40px;
        height: 40px;
    }

    .text {
        font-size: 12px;
        font-weight: 600;
        margin: 0;
    }

    .outlined {
        text-shadow: -1px -1px 0 white, 0 -1px 0 white, 1px -1px 0 white,
            1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 1px 0 white,
            -1px 0 0 white;
    }
</style>
