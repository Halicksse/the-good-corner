import { Link } from "react-router-dom";
import { Category, Picture } from "../generated/graphql-types";

type AdCardProps = {
  __typename?: string;
  title: string;
  price: number;
  pictures: Picture[];
  id: number;
  category: Category;
};

const AdCard = ({ title, price, pictures, id }: AdCardProps) => (
  <div className="ad-card-container">
    <Link className="ad-card-link" to={`/ad/${id}`}>
      <img className="ad-card-image" src={pictures?.at(0)?.url} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price} €</div>
      </div>
    </Link>
  </div>
);

export default AdCard;
