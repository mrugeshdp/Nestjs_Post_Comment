import { Posts } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => Posts, (post) => post.id)
  post: Posts;

  @Column()
  commentText: string;

  @Column({ default: true })
  commentStatus: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
