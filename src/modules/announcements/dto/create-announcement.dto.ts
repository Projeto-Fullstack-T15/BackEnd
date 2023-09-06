import { IsString, IsInt, IsNumber, IsArray } from "class-validator";

export class CreateAnnouncementDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    color: string;

    @IsInt()
    year: number;

    @IsString()
    fuel_type: string;

    @IsNumber()
    mileage: number;

    @IsNumber()
    price: number;

    @IsNumber()
    fipe_price: number;

    @IsString()
    description: string;

    @IsString()
    cover_image: string;
}

export class CreateAnnouncementRequest extends CreateAnnouncementDto {
    @IsArray()
    @IsString({ each: true })
    images: string[];
}