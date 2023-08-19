import { z } from "zod";

const z = require('zod');

export const usersSchema = z.object({
    id: z.number().int().positive(),
    IDConta: z.number().int().positive(),
    IDEndereço: z.number().int().positive(),
    Nome: z.string(),
    CPF: z.string(),
    Telefone: z.string(),
    DataNascimento: z.date(),
    Descrição: z.string()
});

import { z } from 'zod';

export const EnderecoSchema = z.object({
    id: z.number().int().positive(),
    CEP: z.string(),
    Estado: z.string(),
    Cidade: z.string(),
    Rua: z.string(),
    Numero: z.string(),
    Complemento: z.string().optional().nullable(),
    IDUsuario: z.number().int().positive()
});
