import { MinLength } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Picture } from "./Picture";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  @MinLength(10)
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ads, { eager: true})
  user: User;

  @Field()
  @Column()
  price: number;

  @Field(() => [Picture])
  @OneToMany(() => Picture, (picture) => picture.ad, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  pictures: Picture[];

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  tags: Tag[];
}
