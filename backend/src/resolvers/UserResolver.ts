import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import * as argon2 from "argon2";

import jwt, { Secret } from "jsonwebtoken";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email?: String;
}

@Resolver(User)
class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    const result = await User.save({
      email: newUserData.email,
      hashedPassword: await argon2.hash(newUserData.password),
    });
    console.log("result", result);
    return "The user was created";
  }

  @Mutation(() => String)
  async login(@Arg("data") loginUserData: UserInput, @Ctx() context: any) {
    let isPasswordCorrect = false;
    const user = await User.findOneBy({ email: loginUserData.email });
    if (user) {
      isPasswordCorrect = await argon2.verify(
        user.hashedPassword,
        loginUserData.password
      );
    }
    if (isPasswordCorrect === true && user !== null) {
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY as Secret
      );
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

      return "ok";
    } else {
      throw new Error("Incorrect login");
    }
  }

  @Mutation(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader(
      "Set-Cookie",
      `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
    );
    return "logged out";
  }

  @Query(() => UserInfo)
  async getUserInfo(@Ctx() context: any) {
    if (context.email) {
      return { isLoggedIn: true, email: context.email };
    } else {
      return { isLoggedIn: false };
    }
  }
}

export default UserResolver;
