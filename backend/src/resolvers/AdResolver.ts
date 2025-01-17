import AdInput from "../inputs/AdInput";
import { Ad } from "../entities/Ad";
import { User } from "../entities/User";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UpdateAdInput from "../inputs/UpdateAdInput";
import { FindManyOptions, Like } from "typeorm";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds(
    @Arg("title", { nullable: true }) title?: string,
    @Arg("category", { nullable: true }) category?: string
  ) {
    let ads: Ad[] = [];
    let findOptions: FindManyOptions<Ad> = {
      order: {
        id: "DESC",
        pictures: {
          id: "DESC",
        },
      },
    };
    if (title) {
      findOptions = { ...findOptions, where: { title: Like(`%${title}%`) } };
    }
    if (category) {
      findOptions = {
        ...findOptions,
        where: { category: { title: category } },
      };
    }
    ads = await Ad.find(findOptions);
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOne({
      where: { id: id },
      order: { pictures: { id: "DESC" } },
    });
    if (ad === null) {
      throw new Error("Cannot find ad with id " + id);
    }
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: AdInput, @Ctx() context: any) {
    console.log("context of create new ad mutation", context);
    const userFromContext = await User.findOneByOrFail({
      email: context.email,
    });
    const newAdToSave = Ad.create({
      ...newAdData,
      user: userFromContext,
    });
    const result = await newAdToSave.save();
    return result;
  }

  @Authorized("ADMIN") //on ajoute un role ADMIN pour pouvoir supprimer une annonce
  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number) {
    const result = await Ad.delete(id);
    console.log("result", result.affected);
    if (result.affected === 1) {
      return "Ad has been deleted";
    } else {
      throw new Error("Ad has not been found");
    }
  }

  @Mutation(() => String)
  async updateAd(@Arg("data") updateAdData: UpdateAdInput) {
    let adToUpdate = await Ad.findOneByOrFail({ id: updateAdData.id });
    console.log("ad to update", adToUpdate);
    adToUpdate = Object.assign(adToUpdate, updateAdData);
    console.log("ad to update", adToUpdate);
    const result = await adToUpdate.save();
    console.log(result);
    return "Ad has been updated";
  }
}

export default AdResolver;
