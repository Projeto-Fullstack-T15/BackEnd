import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('api/comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

	@Patch(':id')
	public async update(@Param('id') id: string, @Body() data: UpdateCommentDto) {
		return this.commentsService.update(+id, data);
	}

	@Delete(':id')
	public async remove(@Param('id') id: string) {
		return this.commentsService.remove(+id);
	}
}
