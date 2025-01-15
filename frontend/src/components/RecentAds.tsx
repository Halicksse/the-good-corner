import { useGetAllAdsQuery } from "../generated/graphql-types";
import AdCard from "./AdCard";

const RecentAds = () => {
  const { loading, error, data } = useGetAllAdsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {data.getAllAds.map((el) => {
            // console.log("el", el);
            return (
              <div key={el.id}>
                <AdCard
                  id={el.id}
                  title={el.title}
                  pictures={el.pictures}
                  price={el.price}
                  category={el.category}
                />
                <button onClick={() => {}}>Delete</button>
              </div>
            );
          })}
        </section>
      </>
    );
  }
};

export default RecentAds;
