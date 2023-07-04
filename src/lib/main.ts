import {writable} from 'svelte/store';
import {API_HOST} from "./api";
import type {Restroom, Review} from "./model";

function restroomStore() {
    const {subscribe, set} = writable<Array<Restroom>>([]);

    return {
        subscribe,
        fetchAll: async () => {
            await fetch(API_HOST + "/restrooms")
                .then(async data => set(await data.json()))
                .catch(error => {
                    console.error(error);
                    set([])
                })
        }
    };
}

function currentRestroomStore() {
    const {subscribe, set} = writable<Restroom>(null);

    return {
        subscribe,
        set: async (restroom) => {
            set(restroom)
            await reviews.fetch(restroom.id)
        },
    };
}

function reviewStore() {
    const {subscribe, set} = writable<Array<Review>>([]);

    return {
        subscribe,
        fetch: async (restroomId) => {
            await fetch(API_HOST + "/reviews?restroomId=" + restroomId)
                .then(async data => set(await data.json()))
                .catch(error => {
                    console.error(error);
                    set([])
                })
        },
    };
}

export const restrooms = restroomStore();
export const currentRestroom = currentRestroomStore();
export const reviews = reviewStore()
