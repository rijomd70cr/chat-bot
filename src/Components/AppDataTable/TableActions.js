import { Drawer, Grid, InputAdornment} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../Button";
import TextBox from "../TextBox";
import SelectBox from "../SelectBox";
import { request } from "../../Core/Services/Request";
import { url } from "../../Core/Utilities";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { getAuthUser } from "../../Core/Services/Auth";

export default function TableActions({ filterUrl = "", leftContent = "", filterComponent = "", customActions = "", onCreate = () => {}, open = false, onSearch = () => {}, onFilter = () => {}, onClose = () => {} }) {

    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [filterData, setFilterData] = useState({});
    const authUserRole = getAuthUser('role');

    const fetchData = useCallback(() => {
        if(filterUrl) {
            let urlQuery = searchParams.get('key') ?? "coa_master"
            request(url('/sections/table/filters?key=' + urlQuery))
            .then(res => {
                setData(res.result)
            })
            .catch(error => {

            })
        }
    }, [searchParams, filterUrl])

    useEffect(() => {
        fetchData()
    }, [searchParams, fetchData]);

    // const handleFilterAction = () => {
    //     let actions = [];
    //     for (let i = 0; i < fieldData.length; i++) {
    //         const element = fieldData[i];
    //         if(element.selectedActions) {
    //             actions.push(element.selectedActions)
    //         }
    //     }

    //     let query = "";
    //     actions = [...new Set(actions)];
    //     for (let k = 0; k < actions.length; k++) {
    //         const element2 = actions[k];
    //         let queryValue = "";
    //         for (let l = 0; l < fieldData.length; l++) {
    //             const element3 = fieldData[l];
    //             if(element2 === element3.selectedActions) {
    //                 queryValue += `${element3.selectedField},`
    //             }
    //         }
    //         query += `${element2}=${queryValue}`;
    //     }

    //     query = query.replace(/,(?![^,]*,)/, '');
    //     query = `&${query}`;
    //     setFinalQuery(query);
    //     onFilter(query)
    // }

    return (
        <div>
            <div style={{display: 'flex', marginBottom: 10, marginTop: -12}}>
                <div style={{width: "100%"}}>
                    <div style={{marginTop: '10px'}}>
                        <span>{leftContent}</span>
                    </div>
                </div>
                <div style={{width: "100%"}}>
                    <div style={{display: 'flex'}}>
                        <form style={{display: 'contents'}} onSubmit={event => {
                            event.preventDefault();
                            onSearch(searchField)
                        }}>
                            <TextBox 
                            className="data-table-search-box"
                            inputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    {searchField ? <CloseIcon onClick={event => {
                                        setSearchField("");
                                        onSearch("");
                                    }} style={{cursor: 'pointer'}} /> : null}
                                  </InputAdornment>
                                ),
                            }}
                            value={searchField}
                            onChange={event => setSearchField(event.target.value)} placeholder="Search..." autoFocus/>
                            <Button type="submit" icon={<SearchIcon />} style={{marginLeft: 5}} label="Search" />
                        </form>
                        <Button onClick={event => setOpenModal(true)} icon={<FilterListIcon />} style={{marginLeft: 5}} label="Filter" />
                        {/* <Button icon={<RefreshIcon />} style={{marginLeft: 5}} label="Refresh" /> */}
                        {authUserRole !== 'district' ? <Button onClick={onCreate} icon={<AddIcon />} style={{marginLeft: 5}} label="Create" /> : null}
                        
                        {customActions}
                    </div>
                </div>
            </div>
            <Drawer
                anchor={"right"}
                open={openModal}
                onClose={event => setOpenModal(false)}
            >
                <div style={{padding: 10, width: "30rem"}}>
                    <div style={{display: 'flex'}}>
                        <div style={{fontWeight: 'bold', fontSize: 16, width: '100%'}}>Filter</div>
                        <div style={{width: '100%', textAlign: 'right', display: 'contents'}}>
                            <Button color="error" label="Close" onClick={event => setOpenModal(false)} />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div>{filterComponent}</div>
                        <Grid container spacing={2}>
                            {data?.fields?.map((value, index) => {
                                return (
                                    <Grid key={index} item md={4}>
                                        <SelectBox onChange={event => {
                                            setFilterData(p => ({...p, [value.key]: event.target}))
                                            if(value.relation) {
                                                request(url(value.relation.api + '&field=' + value.relation.find + ',' + event.target.value + '&select='+value.relation.select))
                                                .then(res => {
                                                    let s = data.fields.map(i => {
                                                        if(i.key === value.relation.fieldKey) {
                                                            i.options = res.result
                                                        }

                                                        return i;
                                                    })
                                                    setData(p => ({
                                                        ...p,
                                                        data: {
                                                            ...p.data,
                                                            fields: s
                                                        }
                                                    }))
                                                })
                                            }
                                        }} value={filterData[value.key]?.value} placeholder="-Fields-" label={value.name} options={value?.options?.map(i => ({...i, value: i.id}))} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}