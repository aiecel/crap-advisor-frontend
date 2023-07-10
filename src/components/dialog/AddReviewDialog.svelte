<script lang="ts">
    import { addReview } from "$lib/api";
    import type { Restroom } from "$lib/model";
    import { reviews } from "$lib/store/reviewsStore";
    import Button from "../Button.svelte";

    export let restroom: Restroom;
    export let isVisible: Boolean = false;

    let dialogElement: HTMLDialogElement;

    let primaryFixtures: number | null = 3;
    let secondaryFixtures: number | null = 3;
    let cleanness: number | null = 3;
    let comfort: number | null = 3;
    let comment: string | null;

    $: isVisible, showOrHideDialog();

    function showOrHideDialog() {
        if (isVisible) {
            dialogElement?.showModal();
        } else {
            dialogElement?.close();
        }
    }

    function submit() {
        addReview({
            restroomId: restroom.id,
            marks: {
                primaryFixtures,
                secondaryFixtures,
                cleanness,
                comfort,
            },
            comment,
        }).then(() => {
            isVisible = false;
            reviews.fetchForRestroom(restroom.id);
        });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialogElement} on:close={() => (isVisible = false)}>
    <h2>Отзыв на</h2>
    <h1>{restroom.name}</h1>

    <label for="primaryFixtures">Первичная сантехника</label>
    <input
        bind:value={primaryFixtures}
        type="range"
        min="1"
        max="5"
        name="primaryFixtures"
    />

    <label for="secondaryFixtures">Вторичная сантехника</label>
    <input
        bind:value={secondaryFixtures}
        type="range"
        min="1"
        max="5"
        name="secondaryFixtures"
    />

    <label for="cleanness">Чистота</label>
    <input
        bind:value={cleanness}
        type="range"
        min="1"
        max="5"
        name="cleanness"
    />

    <label for="comfort">Комфорт</label>
    <input bind:value={comfort} type="range" min="1" max="5" name="comfort" />

    <label for="comment">Отзыв</label>
    <textarea bind:value={comment} name="comment" />

    <pre />

    <Button onClick={submit}>Оставить отзыв</Button>
    <Button onClick={() => (isVisible = false)}>Назад</Button>
</dialog>

<style>
    dialog {
        width: 500px;
        border: none;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 30px;
        padding: 30px;
    }

    h2 {
        margin: 0;
        font-weight: 300;
        font-size: 1em;
        color: #aaaaaa;
    }

    h1 {
        margin: 0;
        margin-bottom: 30px;
    }

    input {
        display: block;
        margin-bottom: 10px;
    }

    textarea {
        box-sizing: border-box;
        font-family: inherit;
        font-size: 1em;
        border: none;
        border-radius: 10px;
        background-color: #eeeeee;
        padding: 10px;
        min-height: 2em;
        max-height: 15em;
        width: 100%;
        resize: vertical;
    }
</style>
