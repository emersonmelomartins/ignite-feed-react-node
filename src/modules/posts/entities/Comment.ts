import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "@modules/users/entities/User";
import { Post } from "./Post";

@Entity("comments")
export class Comment {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Column()
  post_id: string;

  @Column()
  commentary: string;

  @Column()
  likes: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    this.likes = 0;
  }
}
