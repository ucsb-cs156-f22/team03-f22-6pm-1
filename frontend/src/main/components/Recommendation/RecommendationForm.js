import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

function RecommendationForm({ initialRecommendation, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialRecommendation || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();
    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialRecommendation && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="RecommendationForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialRecommendation.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-requesterEmail"
                    requesterEmail="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", { required: "requesterEmail is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="professorEmail">Professor Email</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-professorEmail"
                    professorEmail="professorEmail"
                    type="text"
                    isInvalid={Boolean(errors.professorEmail)}
                    {...register("professorEmail", { required: "professorEmail is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.professorEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-explanation"
                    explanation="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", { required: "explanation is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateRequested">Date Requested</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-dateRequested"
                    dateRequested="dateRequested"
                    type="text"
                    isInvalid={Boolean(errors.dateRequested)}
                    {...register("dateRequested", { required: true, pattern: isodate_regex})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateRequested && "dateRequested is required."}
                    {errors.dateRequested?.type === 'pattern' && 'dateRequested must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateNeeded">Date Needed</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-dateNeeded"
                    dateNeeded="dateNeeded"
                    type="text"
                    isInvalid={Boolean(errors.dateNeeded)}
                    {...register("dateNeeded", { required: true, pattern: isodate_regex})}
                />
                <Form.Control.Feedback type="invalid">
                {errors.dateNeeded && "dateNeeded is required."}
                {errors.dateNeeded?.type === 'pattern' && 'dateNeeded must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="done">Done</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-done"
                    done="done"
                    type="text"
                    isInvalid={Boolean(errors.done)}
                    {...register("done", { required: "done is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.done?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="RecommendationForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="RecommendationForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RecommendationForm;
