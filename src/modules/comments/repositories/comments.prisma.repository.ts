import { Comment } from "@prisma/client";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { CommentsRepository } from "./comments.repository";
import { PrismaService } from "src/database/prisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
    constructor(
        private readonly db: PrismaService
    ) { }

    public async insertNewComment(
        announcement_id: number,
        account_id: number,
        data: CreateCommentDto
    ): Promise<Comment> {
        try {
            const newComment = await this.db.comment.create({
                data: { ...data, announcement_id, account_id }
            });

            return newComment;
        } catch (err) {
            console.error(err)
            throw new InternalServerErrorException("An error ocurred when tried to create comment");
        }
    }

    public async getAnnouncementComments(
        announcement_id: number
    ): Promise<Array<Comment>> {
        try {
            const findComments = await this.db.comment.findMany({ where: { announcement_id } });

            return findComments;
        } catch (err) {
            throw new InternalServerErrorException("An error ocurred when tried to get comments");
        }
    }

    public async findCommentById(comment_id: number): Promise<Comment> {
        try {
            const findComment = await this.db.comment.findUniqueOrThrow({ where: { id: comment_id } });

            return findComment;
        } catch (err) {
            throw new InternalServerErrorException("An error ocurred when tried to get comments");
        }
    }

    public async updateComment(
        id: number,
        data: UpdateCommentDto
    ): Promise<Comment> {
        try {
            const updatedComment = await this.db.comment.update({ where: { id }, data });

            return updatedComment;
        } catch (err) {
            throw new InternalServerErrorException("An error ocurred when tried to update comment");
        }
    }

    public async deleteComment(
        id: number
    ): Promise<void> {
        try {
            await this.db.comment.delete({ where: { id } });
        } catch (err) {
            throw new InternalServerErrorException("An error ocurred when tried to delete comment");
        }
    }
}