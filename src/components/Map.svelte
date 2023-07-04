<svelte:head>
    <script src='https://api-maps.yandex.ru/3.0/?lang=ru_RU&amp;apikey=1979b9d5-98ad-4ff1-8015-c4de94371af1'
            type="text/javascript">
    </script>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import {restrooms} from "../lib/main";
    import RestroomMarker from "./RestroomMarker.svelte";

    onMount(() => initMap())

    async function initMap() {
        ymaps3.ready.then(async (ymaps) => {
            const {YMap, YMapDefaultSchemeLayer, YMapControls, YMapDefaultFeaturesLayer} = ymaps;
            const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

            const map = new YMap(document.getElementById('map'), {
                location: {center: [49, 53], zoom: 10},
                behaviors: ['drag', 'pinchZoom', 'mouseTilt', 'mouseRotate', 'mouseTilt', 'dblClick']
            }, [
                new YMapDefaultSchemeLayer(),
                new YMapControls({position: 'right'}, [new YMapZoomControl({})]),
                new YMapDefaultFeaturesLayer({id: 'markers'})
            ]);

            restrooms.subscribe(restrooms => {
                restrooms.forEach(restroom => {
                    map.addChild(createMarker(restroom, ymaps));
                })
            });
        });
    }

    function createMarker(restroom, ymaps) {
        const containerElement = document.createElement("div")
        containerElement.id = "marker"

        new RestroomMarker({
            target: containerElement,
            props: {
                restroom: restroom
            }
        });

        const {YMapMarker} = ymaps;
        return new YMapMarker(
            {coordinates: [restroom.location.longitude, restroom.location.latitude]},
            containerElement
        )
    }
</script>

<div id="map"></div>

<style>
    #map {
        position: absolute;
        z-index: -54;
        width: 100vw;
        height: 100vh;
    }
</style>
