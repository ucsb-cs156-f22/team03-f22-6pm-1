import { render, waitFor} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

import AppNavbar from "main/components/Nav/AppNavbar";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("AppNavbar tests", () => {

    const queryClient = new QueryClient();

    test("renders correctly for regular logged in user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const doLogin = jest.fn();

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, pconrad.cis@gmail.com")).toBeInTheDocument());
    });

    test("renders correctly for admin user", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const doLogin = jest.fn();

        const { getByText , getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Welcome, phtcon@ucsb.edu")).toBeInTheDocument());
        const adminMenu = getByTestId("appnavbar-admin-dropdown");
        expect(adminMenu).toBeInTheDocument();        
    });

    test("renders H2Console and Swagger links correctly", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const { getByText  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("H2Console")).toBeInTheDocument());
        const swaggerMenu = getByText("Swagger");
        expect(swaggerMenu).toBeInTheDocument();        
    });


    test("renders the todos menu correctly", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-todos-dropdown")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://localhost:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://localhost:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://127.0.0.1:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://127.0.0.1:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());
    });

    test("renders the AppNavbarLocalhost when on http://127.0.0.1:3000", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://127.0.0.1:3000')

        const {getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbarLocalhost")).toBeInTheDocument());

    });

    test("does NOT render the AppNavbarLocalhost when on localhost:8080", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;
        const doLogin = jest.fn();

        delete window.location
        window.location = new URL('http://localhost:8080')

        const {getByTestId, queryByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("AppNavbar")).toBeInTheDocument());
        expect(queryByTestId(/AppNavbarLocalhost/i)).toBeNull();
    });

    test("renders the ucsbdates menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-ucsbdates-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-ucsbdates-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-ucsbdates-list")).toBeInTheDocument() );

    });

    test("renders the ucsbdates menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-ucsbdates-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-ucsbdates-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-ucsbdates-create/)).toBeInTheDocument() );

    });

    test("renders the diningcommons menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-dining-commons-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-dining-commons-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-dining-commons-list/)).toBeInTheDocument() );

    });

    test("renders the articles menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-article-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-article-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-article-list/)).toBeInTheDocument() );


    });

    test("renders the articles menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-article-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-article-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-article-list")).toBeInTheDocument() );

    });



    test("renders the menuitems menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-menu-item-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-menu-item-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-menu-item-list/)).toBeInTheDocument() );

    });

    test("renders the menuitems menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-menu-item-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-menu-item-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-menu-item-list")).toBeInTheDocument() );

    });

    test("renders the recommendation menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-recommendation-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-recommendation-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-recommendation-create/)).toBeInTheDocument() );

    });

    test("renders the recommendation menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-recommendation-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-recommendation-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-recommendation-list")).toBeInTheDocument() );

    });

    test("renders the ucsborganizations menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-ucsborganizations-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-ucsborganizations-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId(/appnavbar-ucsborganizations-create/)).toBeInTheDocument() );

    });

    test("renders the ucsborganizations menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-ucsborganizations-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-ucsborganizations-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-ucsborganizations-list")).toBeInTheDocument() );

    });

    test("renders the help request menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;
    
        const doLogin = jest.fn();
    
        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        await waitFor(() => expect(getByTestId("appnavbar-help-request-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-help-request-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-help-request-list")).toBeInTheDocument() );
      });

      test("renders the help request menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-helprequest-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-helprequest-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-helprequest-list")).toBeInTheDocument() );

    });

    test("renders the reviews menu correctly for an admin", async () => {

        const currentUser = currentUserFixtures.adminUser;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-reviews-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-reviews-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-reviews-list")).toBeInTheDocument() );

    });

    test("renders the reviews menu correctly for a user", async () => {

        const currentUser = currentUserFixtures.userOnly;
        const systemInfo = systemInfoFixtures.showingBoth;

        const doLogin = jest.fn();

        const {getByTestId  } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AppNavbar currentUser={currentUser} systemInfo={systemInfo} doLogin={doLogin} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("appnavbar-reviews-dropdown")).toBeInTheDocument());
        const dropdown = getByTestId("appnavbar-reviews-dropdown");
        const aElement = dropdown.querySelector("a");
        expect(aElement).toBeInTheDocument();
        aElement?.click();
        await waitFor( () => expect(getByTestId("appnavbar-reviews-list")).toBeInTheDocument() );

    });

    
   
});