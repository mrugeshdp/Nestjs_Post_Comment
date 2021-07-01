import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @Column()
  postTitle: string;

  @Column()
  postDescription: string;

  @Column({ default: true })
  postStatus: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;

  @Column({ default: 0 })
  totalLike: number;

  @Column()
  filePath: string;
}
