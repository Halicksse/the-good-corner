import { Tag } from "../entities/Tag";
import { Query, Resolver } from "type-graphql";

@Resolver(Tag)
class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    const tags = await Tag.find();
    return tags;
  }
}

export default TagResolver;
