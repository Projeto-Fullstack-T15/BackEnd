import { z } from "zod";

const AnnouncementSchema = z.object({
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
const AnnouncementSchemaRequest = AnnouncementSchema.omit({
  ID: true,
});
const AnnouncementSchemaGet = z
  .object({
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
  })
  .array();

const updateAnnouncementSchemaRquest = AnnouncementSchema.partial().omit({
  ID: true,
});
export {
  AnnouncementSchema,
  updateAnnouncementSchemaRquest,
  AnnouncementSchemaGet,
  AnnouncementSchemaRequest,
};
