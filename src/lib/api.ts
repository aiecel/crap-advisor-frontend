import type { Marks, Restroom, Review } from "./model";

const API_HOST = "http://localhost:8082";

export type AddReviewRequest = {
    restroomId: number;
    marks: Marks;
    comment: string | null;
};

export async function getAllRestrooms(): Promise<Array<Restroom>> {
    return await fetch(API_HOST + "/restrooms").then(
        async response => await response.json()
    );
}

export async function getReviews(restroomId: number): Promise<Array<Review>> {
    return await fetch(API_HOST + "/reviews?restroomId=" + restroomId).then(
        async response => await response.json()
    );
}

export async function addReview(request: AddReviewRequest): Promise<Review> {
    return await fetch(API_HOST + "/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
        .then(async response => await response.json())
        .catch(reason => console.error(reason));
}
