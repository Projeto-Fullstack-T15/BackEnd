import { z } from "zod";

const AnnouncementSchema = z.object({
  ID: z.number(),
  Brand: z.string(),
  Model: z.string(),
  Color: z.string(),
  Year: z.number(),
  FuelType: z.string(),
  Mileage: z.number(),
  Price: z.number(), // Aqui, o preço é uma string porque é um valor decimal no formato de string.
  PriceTableFIPE: z.number(), // Também é uma string.
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
    Price: z.string(), // Aqui, o preço é uma string porque é um valor decimal no formato de string.
    PriceTableFIPE: z.string(), // Também é uma string.
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
