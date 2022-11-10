import OurTable from "main/components/OurTable";
//import { useBackendMutation } from "main/utils/useBackend";
//import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBDateUtils"
//import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";

export default function RecommendationTable({ recommendation, _currentUser }) {

    // const navigate = useNavigate();

    //const editCallback = (cell) => {
    //    navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    //}

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdates/all"]
    // );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    // "requesterEmail": "student@email.com",
    // "professorEmail": "professor@email.com",
    // "explanation": "Test",
    // "dateRequested": "2022-10-01T00:00:00",
    // "dateNeeded": "2022-10-01T00:00:00",
    // "done": false

    const columns = [
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail', // accessor is the "key" in the data
        },
        {
            Header: 'Professor Email',
            accessor: 'professorEmail',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Date Requested',
            accessor: 'dateRequested',
        },
        {
            Header: 'Date Needed',
            accessor: 'dateNeeded',
        },
        {
            Header: 'Done',
            accessor: 'done',
        }
    ];

    // const _columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
    //     ButtonColumn("Delete", "danger", deleteCallback, "UCSBDatesTable")
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    const columnsToDisplay = columns;

    return <OurTable
        data={recommendation}
        columns={columnsToDisplay}
        testid={"RecommendationTable"}
    />;
};