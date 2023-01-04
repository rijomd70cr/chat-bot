import React, { useEffect } from "react";
import Button from "../../../Components/Button";
import SelectBox from "../../../Components/SelectBox";
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../Reducer/Actions";

export default function HeaderActionContainer() {

    const dispatch = useDispatch();

    const { organizations } = useSelector(state => ({
        organizations: state
    }))

    console.log(organizations)

    useEffect(() => {
        dispatch(getOrganizations())
    }, [dispatch])

    return (
        <div style={{marginTop: -12}}>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <SelectBox style={{width: '30%', marginRight: 5}} value="1" options={[{label: 'Multi Net', value: '1'}]} />
                <Button style={{marginRight: 5}} fullWidth label={<ReplayIcon />} isLoading={true} />
            </div>
        </div>
    )
}