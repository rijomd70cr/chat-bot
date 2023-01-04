import React, { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import SelectBox from "../../../Components/SelectBox";
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../../Organizations/Reducer/Actions";
import { setDropdownData } from "../../../Core/Utilities";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function HeaderActionContainer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [input, setInput] = useState({
        organization: searchParams.get('id')
    })

    const { organizations } = useSelector(state => ({
        organizations: setDropdownData(state.organizations.organizationDropDown, ['id', 'name'])
    }))

    useEffect(() => {
        dispatch(getOrganizations())
    }, [dispatch])

    return (
        <div style={{marginTop: -18}}>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <SelectBox style={{width: '30%', marginRight: 5}} onChange={event => {
                    let val = event.target.value;
                    setInput(p => ({...p, organization: val}));
                    navigate({
                        search: '?id=' + val,
                    })

                }} value={input.organization} options={organizations} />
                <Button style={{marginRight: 5}} fullWidth label={<ReplayIcon />} isLoading={true} />
            </div>
        </div>
    )
}