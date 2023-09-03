import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
	constructor(
		private readonly commentsRepository: CommentsRepository
	) { }

	public async insertNewComment(
		announcement_id: number,
		account_id: number,
		data: CreateCommentDto
	) {
		return await this.commentsRepository.insertNewComment(announcement_id, account_id, data);
	}

	public async findOneById(comment_id: number) {
		return await this.commentsRepository.findCommentById(comment_id);
	}
	public async findAllByAnnouncement(
		announcement_id: number,
	) {
		return await this.commentsRepository.getAnnouncementComments(announcement_id);
	}

	public async update(
		id: number,
		data: UpdateCommentDto
	) {
		return await this.commentsRepository.updateComment(id, data);
	}

	public async remove(id: number) {
		return await this.commentsRepository.deleteComment(id);
	}
}
