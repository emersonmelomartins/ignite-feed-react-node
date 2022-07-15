import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  public readonly id?: string;

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({name: "avatar_url"})
  avatar_url(): string {
    switch(process.env.APP_ENVIRONMENT) {
      case "local":
        return `${process.env.APP_LOCAL_URL}/avatar/${this.avatar}`;
      case "heroku":
        return `${process.env.APP_HEROKU_URL}/avatar/${this.avatar}`;
      default:
        return ""
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
