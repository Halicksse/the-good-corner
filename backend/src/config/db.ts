import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";
import { User } from "../entities/User";
import { TempUser } from "../entities/TempUser";

export const dataSourceGoodCorner = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  database: "postgres",
  password: "example",
  entities: [Ad, Category, Tag, Picture, User, TempUser],
  synchronize: true,
  logging: ["error", "query"],
});
