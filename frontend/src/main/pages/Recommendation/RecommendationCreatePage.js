import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RecommendationForm from "main/components/Recommendation/RecommendationForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RecommendationCreatePage() {

  const objectToAxiosParams = (recommendation) => ({
    url: "/api/Recommendation/post",
    method: "POST",
    params: {
      requesterEmail: recommendation.requesterEmail,
      professorEmail: recommendation.professorEmail,
      explanation: recommendation.explanation,
      dateRequested: recommendation.dateRequested,
      dateNeeded: recommendation.dateNeeded,
      done: recommendation.done
    }
  });

  const onSuccess = (recommendation) => {
    toast(`New recommendation Created - id: ${recommendation.id} requesterEmail: ${recommendation.requesterEmail}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/Recommendation/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/recommendation/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Recommendation</h1>

        <RecommendationForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}