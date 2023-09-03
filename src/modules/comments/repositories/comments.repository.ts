import { Comment } from "@prisma/client";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "src/modules/comments/dto/update-comment.dto";

export abstract class CommentsRepository {
    public abstract insertNewComment(announcementId: number, account_id: number, data: CreateCommentDto): Promise<Comment>;
    public abstract getAnnouncementComments(announcement_id: number): Promise<Array<Comment>>;
    public abstract updateComment(commentId: number, data: UpdateCommentDto): Promise<Comment>;
    public abstract deleteComment(commentId: number): Promise<void>;
}