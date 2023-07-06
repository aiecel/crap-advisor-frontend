<script lang="ts">
    import { selectedRestroom } from "$lib/store/selectedRestroomStore";
    import { reviews } from "$lib/store/reviewsStore";
    import Review from "./Review.svelte";
    import AddReviewDialog from "./AddReviewDialog.svelte";

    let isAddReviewDialogVisible: boolean = false;
</script>

<div id="container">
    {#if $selectedRestroom}
        <div id="section-title">
            <h4 id="date">
                {new Date($selectedRestroom.created).toLocaleDateString()}
            </h4>
            <h1 id="title">{$selectedRestroom.name ?? "Crap Advisor"}</h1>
            <h1 id="rating">{$selectedRestroom.rating ?? ""}</h1>
        </div>
        <button on:click={() => (isAddReviewDialogVisible = true)}
            >Add review</button
        >
        <AddReviewDialog
            bind:isVisible={isAddReviewDialogVisible}
            restroom={$selectedRestroom}
        />
        {#each $reviews as review}
            <Review {review} />
        {/each}
    {/if}
</div>

<style>
    #container {
        position: absolute;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.3) 0 0 5px;
        box-sizing: border-box;
        width: 400px;
        height: 100vh;
        padding: 20px;
    }

    #section-title {
        border-bottom: 1px solid black;
    }

    #title {
        font-family: "Arial Black", serif;
        font-size: 48px;
        margin-top: 0;
    }
</style>
