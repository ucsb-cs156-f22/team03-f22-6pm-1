import { render } from "@testing-library/react";
import { menuItemsFixtures } from "fixtures/menuItemsFixtures";
import MenuItemsTable from "main/components/MenuItems/MenuItemsTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("MenuItemsTable tests", () => {
    const queryClient = new QueryClient();

    test("renders without crashing for empty table with user not logged in", () => {
        const currentUser = null;
    
        render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <MenuItemsTable menuItems={[]} currentUser={currentUser} />
            </MemoryRouter>
          </QueryClientProvider>
    
        );
    });
    test("renders without crashing for empty table for ordinary user", () => {
        const currentUser = currentUserFixtures.userOnly;
    
        render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <MenuItemsTable menuItems={[]} currentUser={currentUser} />
            </MemoryRouter>
          </QueryClientProvider>
    
        );
    });

    test("renders without crashing for empty table for admin", () => {
        const currentUser = currentUserFixtures.adminUser;
    
        render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <MenuItemsTable menuItems={[]} currentUser={currentUser} />
            </MemoryRouter>
          </QueryClientProvider>
    
        );
      });

      test("Has the expected column headers and content for adminUser", () => {

        const currentUser = currentUserFixtures.adminUser;
    
        const { getByText, getByTestId } = render(
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <MenuItemsTable menuItems={menuItemsFixtures.threeMenuItems} currentUser={currentUser} />
            </MemoryRouter>
          </QueryClientProvider>
    
        );
    
    
        const expectedHeaders = ['Id', 'DiningCommonsCode', 'Name', 'Station'];
        const expectedFields = ['id', 'diningCommonsCode', 'name', 'station'];
        const testId = "MenuItemsTable";
    
        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });
    
        expectedFields.forEach((field) => {
          const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
          expect(header).toBeInTheDocument();
        });
    
        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1);
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(2);
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent(3);
        expect(getByTestId(`${testId}-cell-row-0-col-diningCommonsCode`)).toHaveTextContent("carrillo");
        expect(getByTestId(`${testId}-cell-row-1-col-diningCommonsCode`)).toHaveTextContent("ortega");
        expect(getByTestId(`${testId}-cell-row-2-col-diningCommonsCode`)).toHaveTextContent("portola");
        expect(getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("salad");
        expect(getByTestId(`${testId}-cell-row-1-col-name`)).toHaveTextContent("pizza");
        expect(getByTestId(`${testId}-cell-row-2-col-name`)).toHaveTextContent("burger");
        expect(getByTestId(`${testId}-cell-row-0-col-station`)).toHaveTextContent("greens");
        expect(getByTestId(`${testId}-cell-row-1-col-station`)).toHaveTextContent("entrees");
        expect(getByTestId(`${testId}-cell-row-2-col-station`)).toHaveTextContent("entree specials");

        // const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
        // expect(editButton).toBeInTheDocument();
        // expect(editButton).toHaveClass("btn-primary");
    
        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveClass("btn-danger");
    
      });
    });