import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './repositories/comments.repository';
import { CommentsPrismaRepository } from './repositories/comments.prisma.repository';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: CommentsRepository,
      useClass: CommentsPrismaRepository
    }
  ],
  exports: [CommentsService]
})
export class CommentsModule { }
