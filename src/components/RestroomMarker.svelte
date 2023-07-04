<script lang="ts">
    import type {Restroom} from "../lib/model";
    import {currentRestroom} from "../lib/main";

    export let restroom: Restroom;
</script>

<div class="container" on:click={() => currentRestroom.set(restroom)}>
    <p class="text outlined">{restroom.name ?? ''}</p>
    <img class="icon" src='restroom.png' alt='{restroom.name}'/>
    <p class="text outlined">{restroom.rating ?? ''}</p>
</div>

<style>
    .container {
        text-align: center;
        cursor: pointer;
        position: relative;
        top: -50px;
        left: -50%;
        transition: all .1s ease-in-out;
    }

    .container:hover {
        transform: scale(1.1);
    }

    .icon {
        width: 40px;
        height: 40px;
    }

    .text {
        font-weight: 600;
        margin: 0;
    }

    .outlined {
        text-shadow:
                -1px -1px 0 white,
                0    -1px 0 white,
                1px  -1px 0 white,
                1px   0   0 white,
                1px   1px 0 white,
                0     1px 0 white,
                -1px  1px 0 white,
                -1px  0   0 white;
    }
</style>
