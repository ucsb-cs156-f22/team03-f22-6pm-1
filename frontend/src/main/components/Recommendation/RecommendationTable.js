import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
//import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/Recommendation",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function MenuItemTable({ recommendation, currentUser }) {
    /*
    const navigate = useNavigate();
    
    const editCallback = (cell) => {
        navigate(`/menuitem/edit/${cell.row.values.id}`)
    }
    */
    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/Recommendation/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback  = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'requesterEmail',
            accessor: 'requesterEmail', // accessor is the "key" in the data
        },
        {
            Header: 'professorEmail',
            accessor: 'professorEmail',
        },
        {
            Header: 'explanation',
            accessor: 'explanation',
        },
        {
            Header: 'dateRequested',
            accessor: 'dateRequested',
        },
        {
            Header: 'dateNeeded',
            accessor: 'dateNeeded',
        },
        {
            Header: 'done',
            accessor: (row, _rowIndex) => String(row.done)
        }
    ];

    const testid = "RecommendationTable";
    
    const columnsIfAdmin = [
        ...columns,
        //ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={recommendation}
        columns={columnsToDisplay}
        testid={testid}
    />;
};