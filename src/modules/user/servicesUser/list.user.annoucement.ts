import { Repository } from "typeorm";
import { Announcement } from "../../announcement/announcement";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
export const listUserAnnouncement = async (
  userId: number
): Promise<Announcement[]> => {
  {
    const userAnnouncementRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

    if (isNaN(userId) || userId.toFixed() !== String(userId)) {
      throw new AppError("Wrong parameter ID: it should be an intenger", 400);
    }
    try {
      const userAnnouncements: Announcement[] =
        await userAnnouncementRepository.find({
          where: { id: userId },
        });

      const jsonAnnouncements = userAnnouncements.map((announcement) => {
        try {
          return JSON.parse(
            JSON.stringify(announcement, (key, value) => {
              if (key === "user") return undefined;
              return value;
            })
          );
        } catch (error) {
          console.log("Erro ao converter objeto em JSON:", error);
          return null;
        }
      });

      return jsonAnnouncements.filter((announcement) => announcement !== null);
    } catch (error) {
      console.log("Erro no TypeORM:", error);
      return [];
    }
  }
};
