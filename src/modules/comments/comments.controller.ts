import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../account/guards/jwt.guard';

@Controller('api/comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	public async update(
		@Param('id') id: string,
		@Body() data: UpdateCommentDto,
		@Req() req: any
	) {
		const findComment = await this.commentsService.findOneById(+id);

		if (!(findComment.account_id === req.user.id)) {
			throw new UnauthorizedException("You cant update other user's comments");
		}

		return this.commentsService.update(+id, data);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	public async remove(
		@Param('id') id: string,
		@Req() req: any
	) {
		const findComment = await this.commentsService.findOneById(+id);

		if (!(findComment.account_id === req.user.id)) {
			throw new UnauthorizedException("You cant delete other user's comments");
		}

		return this.commentsService.remove(+id);
	}
}
