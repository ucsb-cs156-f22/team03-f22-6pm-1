import { render, waitFor, fireEvent } from "@testing-library/react";
import RecommendationForm from "main/components/Recommendation/RecommendationForm";
import { recommendationFixtures } from "fixtures/recommendationFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("RecommendationForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <RecommendationForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Requester Email/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a Recommendation ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <RecommendationForm initialRecommendation={recommendationFixtures.oneRecommendation} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/RecommendationForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/RecommendationForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <RecommendationForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationForm-submit")).toBeInTheDocument());
        const dateRequestedField = getByTestId("RecommendationForm-dateRequested");
        const submitButton = getByTestId("RecommendationForm-submit");

        fireEvent.change(dateRequestedField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/dateRequested is required./)).toBeInTheDocument());
        expect(getByText(/dateRequested is required./)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <RecommendationForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("RecommendationForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/requesterEmail is required./)).toBeInTheDocument());
        expect(getByText(/professorEmail is required./)).toBeInTheDocument();
        expect(getByText(/explanation is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <RecommendationForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationForm-requesterEmail")).toBeInTheDocument());

        const requesterEmailField = getByTestId("RecommendationForm-requesterEmail");
        const professorEmailField = getByTestId("RecommendationForm-professorEmail");
        const explanationField = getByTestId("RecommendationForm-explanation");
        const dateRequestedField = getByTestId("RecommendationForm-dateRequested");
        const dateNeededField = getByTestId("RecommendationForm-dateNeeded");
        const doneField = getByTestId("RecommendationForm-done");
        const submitButton = getByTestId("RecommendationForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'test@email.com' } });
        fireEvent.change(professorEmailField, { target: { value: 'prof@email.com' } });
        fireEvent.change(explanationField, { target: { value: 'explain' } });
        fireEvent.change(dateRequestedField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(dateNeededField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(doneField, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/dateRequested must be in ISO format/)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <RecommendationForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("RecommendationForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


