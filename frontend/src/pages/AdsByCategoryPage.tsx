import { useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const AdsByCategoryPage = () => {
  const { keyword } = useParams();
  const { data, loading, error } = useGetAllAdsQuery({
    variables: { category: keyword },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    return (
      <div>
        <h2>Search results for category: {keyword}</h2>
        <section className="recent-ads">
          {data.getAllAds.map((el) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                pictures={el.pictures}
                price={el.price}
                category={el.category}
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
};

export default AdsByCategoryPage;
