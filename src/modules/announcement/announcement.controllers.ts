import { Request, Response } from "express";
import { AnnouncementCreateRequest, AnnouncementUpdateRequest, ParsedAnnouncement, ParsedAnnouncementList } from "./announcement.interfaces";
import * as services from "./services";
import { GetAnnouncementSchema, ListAnnouncementSchema } from "./announcement.schemas";
import { z } from "zod";

export const list = async (
    request: Request,
    response: Response
): Promise<Response<ParsedAnnouncementList>> => {
    const findAnnouncements = await services.list();
    const parsedAnnouncements = ListAnnouncementSchema.parse(findAnnouncements);

    return response.status(200).json(parsedAnnouncements);
};

export const create = async (
    request: Request,
    response: Response
): Promise<Response<ParsedAnnouncement>> => {
    const parsedRequestData = request.parsedData as AnnouncementCreateRequest;

    const createdAnnouncement = await services.createNew(parsedRequestData);
    const parsedResponse = GetAnnouncementSchema.parse(createdAnnouncement);

    return response.status(201).json(parsedResponse);
};

export const update = async (
    request: Request,
    response: Response
): Promise<Response<ParsedAnnouncement>> => {
    const parsedRequestData = request.parsedData as AnnouncementUpdateRequest;

    const updatedAnnouncement = await services.update(request.announcement, parsedRequestData);
    const parsedResponse = GetAnnouncementSchema.parse(updatedAnnouncement)

    return response.status(200).json(parsedResponse);
};

export const remove = async (
    request: Request,
    response: Response
): Promise<Response<ParsedAnnouncement>> => {
    const removedAnnouncement = await services.remove(request.announcement);
    const parsedResponse = GetAnnouncementSchema.parse(removedAnnouncement);

    return response.status(204).json(parsedResponse);
};
