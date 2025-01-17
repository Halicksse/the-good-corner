import "dotenv/config";
import * as cookie from "cookie";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt, { Secret } from "jsonwebtoken";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";

const start = async () => {
  if (
    process.env.JWT_SECRET_KEY === null ||
    process.env.JWT_SECRET_KEY === undefined
  ) {
    throw Error("no jwt secret");
  }
  await dataSourceGoodCorner.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }, rolesForOperation) => { //on ajoute un authChecker pour vérifier les roles
      if (context.email) {
        if (rolesForOperation.length === 0) { //si il n'y a pas de roles dans le tableau on retourne true
          return true;
        } else {
          if (rolesForOperation.includes(context.userRole)) { //si le role de l'utilisateur est dans le tableau on retourne true
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie as string);
        if (cookies.token !== undefined) {
          const payload: any = jwt.verify(
            cookies.token,
            process.env.JWT_SECRET_KEY as Secret
          );
          console.log("payload in context", payload);
          if (payload) {
            console.log("payload was found and returned to resolver");
            return {
              email: payload.email,
              userRole: payload.userRole, //on ajoute le role de l'utilisateur dans le context
              res: res,
            };
          }
        }
      }
      return { res: res };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");
};
start();
