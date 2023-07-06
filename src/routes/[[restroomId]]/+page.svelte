<script lang="ts">
    import Sidebar from "../../components/Sidebar.svelte";
    import Map from "../../components/Map.svelte";

    import { page } from "$app/stores";
    import { selectedRestroom } from "$lib/store/selectedRestroomStore";

    $: $page.params, selectedRestroom.select(parseInt($page.params.restroomId));
</script>

<div>
    <Sidebar />
    <Map />
</div>

<style>
    :global(body) {
        font-family: "Calibri", sans-serif;
        margin: 0;
    }
</style>
