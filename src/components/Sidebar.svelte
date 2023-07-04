<script>
    import {currentRestroom, reviews} from "../lib/main";

    let _currentRestroom
    currentRestroom.subscribe(newCurrentRestroom => {
        _currentRestroom = newCurrentRestroom
    })

    let _reviews
    reviews.subscribe(newReviews => {
        _reviews = newReviews
    })
</script>

<div id="container">
    {#if _currentRestroom}
        <div id="section-title">
            <h4 id="date">{new Date(_currentRestroom.created).toLocaleDateString()}</h4>
            <h1 id="title">{_currentRestroom.name ?? "Crap Advisor"}</h1>
            <h1 id="rating">{_currentRestroom.rating ?? ""}</h1>
        </div>
        {#each _reviews as review}
            <h1>{review.rating ?? ""}</h1>
            <h4>{review.comment ?? ""}</h4>
        {/each}
    {/if}
</div>

<style>
    #container {
        position: absolute;
        background: linear-gradient(
                90deg,
                white 0%,
                rgba(255, 255, 255, 0) 100%
        );
        box-sizing: border-box;
        width: 500px;
        height: 100vh;
        padding: 40px;
    }

    #title {
        font-family: "Arial Black", serif;
        font-size: 48px;
        margin-top: 0;
    }
</style>
