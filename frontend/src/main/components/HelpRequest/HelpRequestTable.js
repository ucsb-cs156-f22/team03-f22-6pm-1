import OurTable from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";

export default function HelpRequestTable({ helpRequests, currentUser }) {

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Team Id',
            accessor: 'teamId',
        },
        {
            Header: 'Table Or BreakoutRoom',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'Request Time',
            accessor: 'requestTime',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Solved',
            id: 'solved',
            accessor: (row, _rowIndex) => String(row.solved) // hack needed for boolean values to show up
        }
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={"HelpRequestTable"}
    />;
};