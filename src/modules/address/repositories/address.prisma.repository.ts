import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { Address } from "@prisma/client";
import { AddressRepository } from "./address.repository";
import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressPrismaRepository implements AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createNewAddress(
    data: CreateAddressDto,
    account_id: number
  ): Promise<Address> {
    try {
      const newAddress = await this.prisma.address.create({
        data: { ...data, account_id },
      });

      return newAddress;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err, {
        cause: err,
        description: "An error ocurred when tried to create a new address",
      });
    }
  }

  public async getAddressById(id: number): Promise<Address> {
    try {
      const findAddress = await this.prisma.address.findUnique({
        where: { id },
      });

      return findAddress;
    } catch (err) {
      throw new InternalServerErrorException(err, {
        cause: err,
        description: "An error ocurred when tried to search for address",
      });
    }
  }

  public async updateAddress(
    account_id: number,
    data: UpdateAddressDto
  ): Promise<Address> {
    try {
      const updatedAddress = await this.prisma.address.update({
        data,
        where: { account_id },
      });

      return updatedAddress;
    } catch (err) {
      throw new InternalServerErrorException(err, {
        cause: err,
        description: "An error ocurred when tried to update address",
      });
    }
  }
}
