import { Account } from "src/modules/account/entities/account.entity";
import { GalleryImage } from "./image.entity";

export class Announcement {
    readonly id: number;
    account_id: number;
    brand: string;
    model: string;
    color: string;
    year: number;
    fuel_type: string;
    mileage: number;
    price: number;
    description: string;
    cover_image: string;
    gallery_images: Array<GalleryImage>;
    account: Account;
    created_at: Date;
    updated_at: Date | null;
}
