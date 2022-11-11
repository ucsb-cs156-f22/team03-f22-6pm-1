// import { render, waitFor, fireEvent } from "@testing-library/react";
// import RecommendationForm from "main/components/Recommendation/RecommendationForm";
// import { recommendationFixtures } from "fixtures/recommendationFixtures";
// import { BrowserRouter as Router } from "react-router-dom";

// const mockedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => mockedNavigate
// }));


// describe("RecommendationForm tests", () => {

//     test("renders correctly ", async () => {

//         const { getByText } = render(
//             <Router  >
//                 <RecommendationForm />
//             </Router>
//         );
//         await waitFor(() => expect(getByText(/requesterEmail/)).toBeInTheDocument());
//         await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
//     });


//     test("renders correctly when passing in a Recommendation ", async () => {

//         const { getByText, getByTestId } = render(
//             <Router  >
//                 <RecommendationForm initialRecommendation={ucsbDatesFixtures.oneDate} />
//             </Router>
//         );
//         await waitFor(() => expect(getByTestId(/RecommendationForm-id/)).toBeInTheDocument());
//         expect(getByText(/Id/)).toBeInTheDocument();
//         expect(getByTestId(/RecommendationForm-id/)).toHaveValue("1");
//     });


//     test("Correct Error messsages on bad input", async () => {

//         const { getByTestId, getByText } = render(
//             <Router  >
//                 <RecommendationForm />
//             </Router>
//         );
//         await waitFor(() => expect(getByTestId("RecommendationForm-requesterEmail")).toBeInTheDocument());
//         const requesterEmailField = getByTestId("RecommendationForm-requesterEmail");
//         const professorEmailField = getByTestId("RecommendationForm-professorEmail");
//         const submitButton = getByTestId("RecommendationForm-submit");

//         fireEvent.change(requesterEmailField, { target: { value: 'bad-input' } });
//         fireEvent.change(professorEmailField, { target: { value: 'bad-input' } });
//         fireEvent.click(submitButton);

//         await waitFor(() => expect(getByText(/requesterEmail must be in the format ()/)).toBeInTheDocument());
//         expect(getByText(/professorEmail must be in () format/)).toBeInTheDocument();
//     });

//     test("Correct Error messsages on missing input", async () => {

//         const { getByTestId, getByText } = render(
//             <Router  >
//                 <RecommendationForm />
//             </Router>
//         );
//         await waitFor(() => expect(getByTestId("Recommendation-submit")).toBeInTheDocument());
//         const submitButton = getByTestId("Recommendation-submit");

//         fireEvent.click(submitButton);

//         await waitFor(() => expect(getByText(/requesterEmail is required./)).toBeInTheDocument());
//         expect(getByText(/requesterEmail is required./)).toBeInTheDocument();
//         expect(getByText(/professorEmail is required./)).toBeInTheDocument();

//     });

//     test("No Error messsages on good input", async () => {

//         const mockSubmitAction = jest.fn();


//         const { getByTestId, queryByText } = render(
//             <Router  >
//                 <RecommendationForm submitAction={mockSubmitAction} />
//             </Router>
//         );
//         await waitFor(() => expect(getByTestId("Recommendation-reqeusterEmail")).toBeInTheDocument());

//         const requesterEmailField = getByTestId("Recommendation-requesterEmail");
//         const professorEmailField = getByTestId("Recommendation-professorEmail");
//         const explanationField = getByTestId("Recommendation-explanation");
//         const submitButton = getByTestId("Recommendation-submit");

//         fireEvent.change(requesterEmailField, { target: { value: 'test@email.com' } });
//         fireEvent.change(professorEmailField, { target: { value: 'prof@email.com' } });
//         fireEvent.change(explanationField, { target: { value: 'explanation' } });
//         fireEvent.click(submitButton);

//         await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

//         expect(queryByText(/requesterEmail must be in the format ())/)).not.toBeInTheDocument();
//         expect(queryByText(/professorEmail must be in () format/)).not.toBeInTheDocument();

//     });


//     test("Test that navigate(-1) is called when Cancel is clicked", async () => {

//         const { getByTestId } = render(
//             <Router  >
//                 <RecommendationForm />
//             </Router>
//         );
//         await waitFor(() => expect(getByTestId("Recommendation-cancel")).toBeInTheDocument());
//         const cancelButton = getByTestId("Recommendation-cancel");

//         fireEvent.click(cancelButton);

//         await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

//     });

// });


