import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType() //ObjectType permet de dire que c'est un type graphQL
@Entity() //Entity permet de dire que c'est une table de la base de données
export class User extends BaseEntity {
  //User hérite de BaseEntity.
  @PrimaryGeneratedColumn() //PrimaryGeneratedColumn permet de dire que c'est une clé primaire auto incrémentée
  id: number;

  @Field() //Field permet de renvoyer l'id en graphQL
  @Column({ unique: true }) //unique permet de ne pas avoir 2 fois le même email
  email: string;

  @Column() //pas de @Field car on ne veut pas renvoyer le password
  hashedPassword: string;

  @Column({ default: "USER" }) //default permet de dire que le role par défaut est USER
  role: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  @Field(() => [Ad]) //Field permet de renvoyer un tableau d'annonces en graphQL
  ads: Ad[]; //un user peut avoir plusieurs annonces on attend un tableau de Ad
}
