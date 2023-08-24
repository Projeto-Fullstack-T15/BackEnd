import { Request, Response } from "express";
import {
  AnnouncementCreateRequest,
  AnnouncementUpdateRequest,
  ParsedAnnouncement,
  ParsedAnnouncementList,
} from "./announcement.interfaces";
import * as services from "./services";

export const list = async (
  request: Request,
  response: Response
): Promise<Response<ParsedAnnouncementList>> => {
  const findAnnouncements = await services.list();

  return response.status(200).json(findAnnouncements);
};

export const create = async (
  request: Request,
  response: Response
): Promise<Response<ParsedAnnouncement>> => {
  const parsedRequestData = request.parsedData as AnnouncementCreateRequest;

  const createdAnnouncement = await services.createNew(parsedRequestData);

  return response.status(201).json(createdAnnouncement);
};

export const update = async (
  request: Request,
  response: Response
): Promise<Response<ParsedAnnouncement>> => {
  const parsedRequestData = request.parsedData as AnnouncementUpdateRequest;
  const id: number = parseInt(request.params.id);
  const updatedAnnouncement = await services.update(id, parsedRequestData);

  return response.status(200).json(updatedAnnouncement);
};

export const remove = async (
  request: Request,
  response: Response
): Promise<Response<ParsedAnnouncement>> => {
  const removedAnnouncement = await services.remove(request.announcement);

  return response.status(204).json(removedAnnouncement);
};
