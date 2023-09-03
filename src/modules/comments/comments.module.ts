import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './repositories/comments.repository';
import { CommentsPrismaRepository } from './repositories/comments.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    {
      provide: CommentsRepository,
      useClass: CommentsPrismaRepository
    }
  ],
  exports: [CommentsService]
})
export class CommentsModule { }
