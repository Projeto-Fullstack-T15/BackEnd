import { ZodObject } from "zod";
import { Announcement } from "../../modules/announcement/announcement.entity";
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            announcement: Announcement;
            parsedData: ZodObject;
        }
    }
}