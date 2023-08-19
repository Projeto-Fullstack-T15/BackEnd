import { Request, Response } from "express";
import { CreateAccountRequest, LoginAccountRequest, LoginAccountResponse } from "./account.interfaces";
import * as services from "./services";

export const login = async (
	request: Request,
	response: Response
): Promise<Response<LoginAccountResponse>> => {
	const loginData: LoginAccountRequest = request.parsedData;
	const loginResponse: LoginAccountResponse = await services.login(loginData);

	return response.status(200).json(loginResponse);
}

export const create = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const accountData: CreateAccountRequest = request.parsedData;
	const accountResponse = await services.create(accountData);

	return response.status(201).json(accountResponse);
}