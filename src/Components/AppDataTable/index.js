import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import useRedirect from "../../Core/Hooks/Redirect"
import Page from "../Page";
import { fetchTableData, generateFilter, generateHeader, resetHeaderOrder } from "./methods";
import "./style.css";

export default function AppDataTable(props) {

    const { redirectTo } = useRedirect();
    

    const { 
        actions = [
            {
                label: "Create",
                action: () => {
                    redirectTo('/' + props.module + '/create')
                }
            }
        ],
        title = "",
        onRowClicked = () => {},
        apiUrl = "",
        hideColumns = [],
        changeData = [],
        moreColumns = [],
        headerReorder = [],
        onCompleted = () => {},
        module = ""
    } = props;

    const { data, total } = useSelector(state => ({
        data: state.dataTable[module]?.table || [],
        total: state.dataTable[module]?.total || 0
    }));

    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        limit: 19,
        page: 1
    })
   
    const fetchApiData = useCallback(() => {
        let url = apiUrl + generateFilter(filter);
        dispatch(fetchTableData(url, module))
        .then(res => {
            onCompleted(res.result);
            initReducer(module)
        })
    }, [apiUrl, filter, dispatch])

    useEffect(() => {

        if(apiUrl) fetchApiData();

    }, [apiUrl, fetchApiData])

    const generateHeaderSection = () => {

        if(data.length > 0)
        return resetHeaderOrder([
            ...generateHeader(data[0], hideColumns, changeData),
            ...moreColumns
        ], headerReorder)
    }

    const handlePerRowsChange = (event) => {
        setFilter(p => ({...p, limit: event}))
    }

    const handlePageChange = (event) => {
        setFilter(p => ({...p, page: event}))
    }

    return (
        <Page girdSet={{xs: 12}} title={title}
            actions={actions}
        >
            <div className="app-data-table">
                <DataTable
                    onRowClicked={onRowClicked}
                    data={data}
                    columns={generateHeaderSection()}
                    pagination
                    paginationServer
                    paginationTotalRows={+total}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[19, 25, 30, 35, 50]}
                    marginPagesDisplayed={19}
                    activeClassName="active"
            />
            </div>
        </Page>
        
    )
}



const initReducer = (module) => {
  
}