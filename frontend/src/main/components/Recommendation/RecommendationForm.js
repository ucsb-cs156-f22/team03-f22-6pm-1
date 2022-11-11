import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function RecommendationForm({ initialRecommendation, submitAction, buttonLabel="Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialRecommendation || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const _isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    const _yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.
        
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
                    {...register("dateRequested", { required: "dateRequested is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateRequested?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateNeeded">Date Needed</Form.Label>
                <Form.Control
                    data-testid="RecommendationForm-dateNeeded"
                    dateNeeded="dateNeeded"
                    type="text"
                    isInvalid={Boolean(errors.dateNeeded)}
                    {...register("dateNeeded", { required: "dateNeeded is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateNeeded?.message}
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
