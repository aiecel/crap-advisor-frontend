<script>
    import Sidebar from "../components/Sidebar.svelte";
    import Map from "../components/Map.svelte";
    import {onMount} from "svelte";
    import {restrooms} from "../lib/main";

    onMount(() => restrooms.fetchAll())
</script>

<div>
    <Sidebar/>
    <Map/>
</div>

<style>
    :global(body) {
        font-family: "Calibri", sans-serif;
        margin: 0;
    }
</style>
