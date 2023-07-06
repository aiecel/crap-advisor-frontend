import type { Restroom, Review } from "./model";

const API_HOST = "http://localhost:8082";

export async function getAllRestrooms(): Promise<Array<Restroom>> {
    return await fetch(API_HOST + "/restrooms")
        .then(async response => await response.json())
        .catch(reason => console.error(reason));
}

export async function getReviews(restroomId: number): Promise<Array<Review>> {
    return await fetch(API_HOST + "/reviews?restroomId=" + restroomId)
        .then(async response => await response.json())
        .catch(reason => console.error(reason));
}
