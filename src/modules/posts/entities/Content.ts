import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Post } from "./Post";

export enum ContentTypeEnum {
  PARAGRAPH = "paragraph",
  LINK = "link",
}

@Entity("contents")
export class Content {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Column()
  post_id: string;

  @Column()
  type: ContentTypeEnum;

  @Column()
  value: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
