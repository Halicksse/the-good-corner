import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";

import jwt, { Secret } from "jsonwebtoken";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

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

  @Query(() => String)
  async login(@Arg("data") loginUserData: UserInput) {
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
      return token;
    } else {
      throw new Error("Incorrect login");
    }
  }
}

export default UserResolver;
