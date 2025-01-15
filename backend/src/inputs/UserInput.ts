import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
