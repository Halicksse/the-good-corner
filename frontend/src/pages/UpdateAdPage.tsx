import { useParams } from "react-router-dom";
import {
  useGetAdByIdQuery,
  useUpdateAdByIdMutation,
} from "../generated/graphql-types";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";
import { GET_ALL_ADS } from "../graphql/queries";

const UpdateAdPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });
  const [updateAdById] = useUpdateAdByIdMutation({
    refetchQueries: [GET_ALL_ADS],
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    console.log("data", data);
    return (
      <CreateOrUpdateAdForm
        defaultValues={{
          ...data.getAdById,
          createdAt: data.getAdById.createdAt.slice(0, 10),
          category: data.getAdById?.category?.id,
        }}
        submitToBackend={updateAdById}
      />
    );
  }
};
export default UpdateAdPage;
