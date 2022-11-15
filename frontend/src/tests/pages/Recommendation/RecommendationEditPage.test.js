import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import RecommendationEditPage from "main/pages/Recommendation/RecommendationEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("RecommendationEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/recommendation", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RecommendationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit Recommendation")).toBeInTheDocument());
            expect(queryByTestId("RecommendationForm-requesterEmail")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/recommendation", { params: { id: 17 } }).reply(200, {
                id: 17,
                requesterEmail: "test@email.com",
                professorEmail: "prof@email.com",
                explanation: "explain",
                dateRequested: "2022-02-02T00:00",
                dateNeeded: "2022-02-02T00:00",
                done: true
            });
            axiosMock.onPut('/api/recommendation').reply(200, {
                id: 17,
                requesterEmail: "test@email.com",
                professorEmail: "prof@email.com",
                explanation: "explain",
                dateRequested: "2022-02-02T00:00",
                dateNeeded: "2022-02-02T00:00",
                done: true
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RecommendationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RecommendationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("RecommendationForm-requesterEmail")).toBeInTheDocument());

            const idField = getByTestId("RecommendationForm-id");
            const requesterEmailField = getByTestId("RecommendationForm-requesterEmail");
            const professorEmailField = getByTestId("RecommendationForm-professorEmail");
            const dateRequestedField = getByTestId("RecommendationForm-dateRequested");
            const dateNeededField = getByTestId("RecommendationForm-dateNeeded");
            const doneField = getByTestId("RecommendationForm-done");


            expect(idField).toHaveValue("17");
            expect(requesterEmailField).toHaveValue("test@email.com");
            expect(professorEmailField).toHaveValue("prof@email.com");
            expect(dateRequestedField).toHaveValue("2022-02-02T00:00");
            expect(dateNeededField).toHaveValue("2022-02-02T00:00");
            expect(doneField).toHaveValue("true");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <RecommendationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("RecommendationForm-professorEmail")).toBeInTheDocument());

            const idField = getByTestId("RecommendationForm-id");
            const requesterEmailField = getByTestId("RecommendationForm-requesterEmail");
            const professorEmailField = getByTestId("RecommendationForm-professorEmail");
            const dateRequestedField = getByTestId("RecommendationForm-dateRequested");
            const dateNeededField = getByTestId("RecommendationForm-dateNeeded");
            const doneField = getByTestId("RecommendationForm-done");
            const submitButton = getByTestId("RecommendationForm-submit");
                
            expect(idField).toHaveValue("17");
            expect(requesterEmailField).toHaveValue("test@email.com");
            expect(professorEmailField).toHaveValue("prof@email.com");
            expect(dateRequestedField).toHaveValue("2022-02-02T00:00");
            expect(dateNeededField).toHaveValue("2022-02-02T00:00");
            expect(doneField).toHaveValue("true");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(professorEmailField, { target: { value: 'change@email.com' } })
            fireEvent.change(doneField, { target: { value: 'false' } })
            fireEvent.change(dateRequestedField, { target: { value: "2022-12-25T08:00" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("Recommendation Updated - id: 17 requesterEmail: test@email.com");
            expect(mockNavigate).toBeCalledWith({ "to": "/recommendation/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                requesterEmail: 'test@email.com',
                professorEmail: 'change@email.com',
                explanation: 'explain',
                dateRequested: "2022-12-25T08:00",
                dateNeeded: "2022-02-02T00:00",
                done: "false",
            })); // posted object

        });

       
    });
});


