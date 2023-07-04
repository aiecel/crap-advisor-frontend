export type Location = {
    latitude: number;
    longitude: number;
};

export type Restroom = {
    id: number;
    created: Date;
    name: string;
    location: Location;
    rating: number | null;
}

export type Review = {
    id: number;
    restroomId: number;
    created: Date;
    comment: string | null;
    rating: number;
}
