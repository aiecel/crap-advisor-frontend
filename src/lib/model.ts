export type Restroom = {
    id: number;
    name: string;
    created: Date;
    location: Location;
    rating: number | null;
};

export type Review = {
    id: number;
    restroomId: number;
    created: Date;
    comment: string | null;
    rating: number;
    marks: Marks;
};

export type Location = {
    latitude: number;
    longitude: number;
};

export type Marks = {
    primaryFixtures: number | null;
    secondaryFixtures: number | null;
    cleanness: number | null;
    comfort: number | null;
};
