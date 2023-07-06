<script lang="ts">
    import type { Restroom } from "$lib/model";

    export let restroom: Restroom;
    export let isVisible: Boolean = false;

    let dialogElement: HTMLDialogElement;

    $: if (dialogElement && isVisible) dialogElement.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialogElement}
    on:click={() => dialogElement.close()}
    on:close={() => (isVisible = false)}
>
    Review for {restroom.name}
</dialog>
