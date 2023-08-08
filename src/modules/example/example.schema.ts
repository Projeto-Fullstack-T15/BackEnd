import { z } from "zod";

const AnnouncementSchema = z.object({
  ID: z.number(),
  Marca: z.string(),
  Modelo: z.string(),
  Cor: z.string(),
  Ano: z.number(),
  FuelType: z.string(),
  Quilometragem: z.number(),
  Preço: z.number(),
  PriceTableFIPE: z.number(),
  Descrição: z.string(),
});
export { AnnouncementSchema };
