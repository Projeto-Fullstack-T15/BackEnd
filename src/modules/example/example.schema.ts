import { z } from "zod";

const AnnouncementSchemaResponse = z.object({
  ID: z.number(),
  Brand: z.string(),
  Model: z.string(),
  Color: z.string(),
  Year: z.number(),
  FuelType: z.string(),
  Mileage: z.number(),
  Price: z.string(), // Aqui, o preço é uma string porque é um valor decimal no formato de string.
  PriceTableFIPE: z.string(), // Também é uma string.fe
  Description: z.string(),
});
const AnnouncementSchemaRequest = AnnouncementSchemaResponse.omit({ ID: true });
const updateAnnouncementSchemaRquest =
  AnnouncementSchemaResponse.partial().omit({
    ID: true,
  });
export {
  AnnouncementSchemaResponse,
  AnnouncementSchemaRequest,
  updateAnnouncementSchemaRquest,
};
