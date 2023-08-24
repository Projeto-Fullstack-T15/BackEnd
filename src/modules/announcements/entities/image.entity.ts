import { Exclude } from "class-transformer";

export class GalleryImage {
    readonly id: number;
    url: string;

    @Exclude()
    announcement_id: number;
}