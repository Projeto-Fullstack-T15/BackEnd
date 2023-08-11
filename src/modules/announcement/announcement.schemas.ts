import { z } from "zod";

export const GetAnnouncementSchema = z.object({
    ID: z.number(),
    Brand: z.string(),
    Model: z.string(),
    Color: z.string(),
    Year: z.number(),
    FuelType: z.string(),
    Mileage: z.number(),
    Price: z.number(),
    PriceTableFIPE: z.number(),
    Description: z.string(),
});

export const ListAnnouncementSchema = z.object({
    ID: z.number(),
    Brand: z.string(),
    Model: z.string(),
    Color: z.string(),
    Year: z.number(),
    FuelType: z.string(),
    Mileage: z.number(),
    Price: z.string(),
    PriceTableFIPE: z.string(),
    Description: z.string(),
}).array();

export const CreateAnnouncementSchema = GetAnnouncementSchema.omit({ ID: true });
export const UpdateAnnouncementSchema = CreateAnnouncementSchema.partial();