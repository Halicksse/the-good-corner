import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_ALL_ADS } from "../graphql/queries";
import {
  useDeleteAdByIdMutation,
  useGetAdByIdQuery,
} from "../generated/graphql-types";

const AdDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });
  const [deleteAdById] = useDeleteAdByIdMutation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    return (
      <div>
        <h2 className="ad-details-title">{data.getAdById.title}</h2>
        <section className="ad-details">
          <div className="ad-details-image-container">
            {data.getAdById.pictures.map((el) => (
              <img key={el.id} src={el.url} />
            ))}
          </div>
          <div className="ad-details-info">
            <div className="ad-details-price">{data.getAdById.price} €</div>
            <div className="ad-details-description">
              {data.getAdById.description}
            </div>
            <hr className="separator" />
            <div className="ad-details-user">
              Annoncée publiée par <b>{data.getAdById.user.email}</b>{" "}
              {new Date(data.getAdById.createdAt as string).toDateString()}.
            </div>
            <a
              href={`mailto:${data.getAdById.user.email}`}
              className="button button-primary link-button"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                stroke="currentcolor"
                strokeWidth="2.5"
                fill="none"
              >
                <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
              </svg>
              Envoyer un email
            </a>
            <Link to={`/ad/update/${id}`}>
              <button>Edit</button>
            </Link>
            <button
              onClick={async () => {
                console.log("delete ad with id", id);
                if (id) {
                  await deleteAdById({
                    variables: { deleteAdId: parseInt(id) },
                    refetchQueries: [GET_ALL_ADS],
                    awaitRefetchQueries: true,
                  });
                  navigate("/");
                }
              }}
            >
              Delete
            </button>
          </div>
        </section>
      </div>
    );
  }
};

export default AdDetailsPage;
