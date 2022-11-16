import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/UCSBOrganizations",
        method: "DELETE",
        params: {
            orgCode: cell.row.values.orgCode
        }
    }
}

export default function UCSBOrganizationsTable({ ucsbOrganizations, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/diningCommons/edit/${cell.row.values.code}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBOrganizations/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Org Code',
            accessor: 'orgCode',
        },
        {
            Header: 'Org Translation',
            accessor: 'orgTranslation', // needed for tests
        },
        {
            Header: 'Org Translation (Short)',
            accessor: 'orgTranslationShort', // needed for tests

        },
        {
            Header: 'Inactive?',
            id: 'inactive',
            accessor: (row, _rowIndex) => String(row.inactive) // hack needed for boolean values to show up 
        }
    ];

    const testid = "UCSBOrganizationsTable";

    const columnsIfAdmin = [
        ...columns,
        //ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={ucsbOrganizations}
        columns={columnsToDisplay}
        testid={testid}
    />;
};