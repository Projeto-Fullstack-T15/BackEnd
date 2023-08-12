import { z } from "zod";

export const GetAnnouncementSchema = z.object({
    id: z.number(),
    brand: z.string(),
    model: z.string(),
    color: z.string(),
    year: z.number(),
    fuelType: z.string(),
    mileage: z.number(),
    price: z.number(),
    description: z.string(),
});

export const ListAnnouncementSchema = z.object({
    id: z.number(),
    brand: z.string(),
    model: z.string(),
    color: z.string(),
    year: z.number(),
    fuelType: z.string(),
    mileage: z.number(),
    price: z.number(),
    description: z.string(),
}).array();

export const CreateAnnouncementSchema = GetAnnouncementSchema.omit({ id: true });
export const UpdateAnnouncementSchema = CreateAnnouncementSchema.partial();