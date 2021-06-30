import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { typeOrmConfig } from './db-connection/pg.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    PostModule,
    PostCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
