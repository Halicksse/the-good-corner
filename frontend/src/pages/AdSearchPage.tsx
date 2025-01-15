import { useParams } from "react-router-dom";
import AdCard from "../components/AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const AdSearchPage = () => {
  const { keyword } = useParams();
  const { data, error, loading } = useGetAllAdsQuery({
    variables: { title: keyword },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    return (
      <div>
        <h2>Search results for keyword: {keyword}</h2>
        <section className="recent-ads">
          {data.getAllAds.map((el) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                title={el.title}
                pictures={el.pictures}
                price={el.price}
                category={el.category}
                createdAt={el.createdAt}
                description={el.description}
                location={el.location}
                owner={el.owner}
                tags={el.tags}
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
};

export default AdSearchPage;
