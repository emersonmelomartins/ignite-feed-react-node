import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "../../users/entities/User";
import { Comment } from "./Comment";
import { Content } from "./Content";

@Entity("posts")
export class Post {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @OneToMany(() => Content, (content) => content.post)
  @JoinTable()
  content: Content[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinTable()
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
