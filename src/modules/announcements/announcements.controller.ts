import { Controller, Get, Post, Body, Patch, Param, Req, UseGuards, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementRequest } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from '../account/guards/jwt.guard';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Controller('api/announcements')
export class AnnouncementsController {
	constructor(
		private readonly announcementsService: AnnouncementsService,
		private readonly commentsService: CommentsService
	) { }

	@Post()
	@UseGuards(JwtAuthGuard)
	public async create(@Req() req: any, @Body() data: CreateAnnouncementRequest) {
		if (!req.user.isAnnouncer) {
			throw new ForbiddenException("Only announcers can create an announce");
		}

		return this.announcementsService.create(req.user.id, data);
	}

	@Get()
	public async findAll() {
		return this.announcementsService.findAll();
	}

	@Get(':id')
	public async findOne(@Param('id') id: string) {
		return this.announcementsService.findOne(+id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	public async update(@Req() req: any, @Param('id') id: string, @Body() data: UpdateAnnouncementDto) {
		if (!Object.keys(data).length) {
			throw new BadRequestException("Body should not be empty");
		}

		const findAnnouncement = await this.announcementsService.findOne(+id);

		if (findAnnouncement.account_id !== req.user.id) {
			throw new ForbiddenException("You dont have permission to edit this announcemnet");
		}

		const updatedAnnouncement = await this.announcementsService.update(findAnnouncement.id, data);

		return updatedAnnouncement;
	}

	@Get(':id/comments')
	public async getAnnouncementComments(
		@Param('id') id: string
	) {
		const findAnnouncement = await this.announcementsService.findOne(+id);

		if (!findAnnouncement) {
			throw new NotFoundException("Announcement not found");
		}

		const comments = await this.commentsService.findAllByAnnouncement(+id);

		return comments;
	}

	@Post(':id/comments')
	@UseGuards(JwtAuthGuard)
	public async insertAnnouncementComment(
		@Body() data: CreateCommentDto,
		@Req() req: any,
		@Param('id') id: string,
	) {
		const findAnnouncement = await this.announcementsService.findOne(+id);

		if (!findAnnouncement) {
			throw new NotFoundException("Announcement not found");
		}

		const newComment = await this.commentsService.insertNewComment(+id, req.user.id, data);

		return newComment;
	}
}
