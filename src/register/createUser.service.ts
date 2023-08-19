import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { Address } from "../../entity/Address";
import { tUserRequest } from "../../interfaces/users.interfaces";
import { z } from 'zod';
import { EnderecoSchema, usersSchema } from "./users.schemas";

const createUserService = async (userData: tUserRequest) => {
    const validationResult = usersSchema.safeParse(userData);
    if (!validationResult.success) {
        throw new Error("Dados de contato inválidos");
    }
    const validUserData = validationResult.data;

    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const hashedPassword = await hash(validUserData.CPF, 10);

    const newUser = userRepository.create({
        IDConta: validUserData.IDConta,
        IDEndereço: validUserData.IDEndereço,
        Nome: validUserData.Nome,
        password: hashedPassword,
        CPF: validUserData.CPF,
        Telefone: validUserData.Telefone,
        DataNascimento: validUserData.DataNascimento,
        Descrição: validUserData.Descrição ?? null
    });

    await userRepository.save(newUser);

    const addressValidationResult = EnderecoSchema.safeParse(userData);
    if (!addressValidationResult.success) {
        throw new Error("Dados de endereço inválidos");
    }
    const validAddressData = addressValidationResult.data;

    const newAddress = addressRepository.create({
        CEP: validAddressData.CEP,
        Estado: validAddressData.Estado,
        Cidade: validAddressData.Cidade,
        Rua: validAddressData.Rua,
        Numero: validAddressData.Numero,
        Complemento: validAddressData.Complemento ?? null,
        IDUsuario: newUser.id
    });

    await addressRepository.save(newAddress);

    const returnCreatedUser = await userRepository.findOne(newUser.id, {
        relations: ["address"]
    });

    return returnCreatedUser;
};

export { createUserService };
