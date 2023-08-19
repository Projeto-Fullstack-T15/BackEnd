import { Request, Response } from "express";
import { AnnouncementCreateRequest, AnnouncementUpdateRequest } from "./announcement.interfaces";
import * as services from "./services";
import { Announcement } from "./announcement.entity";

export const list = async (
    request: Request,
    response: Response
): Promise<Response<Array<Announcement>>> => {
    const findAnnouncements = await services.list();

    return response.status(200).json(findAnnouncements);
};

export const create = async (
    request: Request,
    response: Response
): Promise<Response<Announcement>> => {
    const parsedRequestData = request.parsedData as AnnouncementCreateRequest;
    const createdAnnouncement = await services.createNew(parsedRequestData);

    return response.status(201).json(createdAnnouncement);
};

export const update = async (
    request: Request,
    response: Response
): Promise<Response<Announcement>> => {
    const parsedRequestData = request.parsedData as AnnouncementUpdateRequest;
    const updatedAnnouncement = await services.update(request.announcement, parsedRequestData);

    return response.status(200).json(updatedAnnouncement);
};

export const remove = async (
    request: Request,
    response: Response
): Promise<Response<void>> => {
    const removedAnnouncement = await services.remove(request.announcement);

    return response.status(204).json(removedAnnouncement);
};
