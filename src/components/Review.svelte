<script lang="ts">
    import type { Review } from "$lib/model";

    export let review: Review;
</script>

<div class="review-container">
    <p class="review-rating">{review.rating}</p>
    <p>{review.comment ?? "no comment"}</p>
</div>

<style>
    .review-container {
        display: grid;
        grid-template-columns: 40px auto;
        border: 1px solid lightgray;
        border-radius: 10px;
        margin-top: 10px;
        padding: 10px;
    }

    .review-rating {
        text-align: center;
        font-size: 20px;
    }
</style>
