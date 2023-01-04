import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { getColors } from '../../../Core/Utilities/index';

import CustomizedInputs from '../../../Components/SelectBox';
import MultipleSelectChip from '../../../Components/SelectBox/MultipleSelectChip';
import Button from "../../../Components/Button";
import AppModalPopUp from "../../../Components/AppModalPopUp";


export default function AdvanceSearch() {

    let menuArray = [{ label: "Production", value: "production" }, { label: "Devolpment", value: "devolpment" }];
    let branchArray = [{ label: "Main", value: "main" }, { label: "Primary", value: "primary" }];
    const clientsDataProduct = [{ label: 'clientsDataProduct 123', value: "001" }, { label: 'clientsDataProduct 456', value: "002" }, { label: 'clientsDataProduct 789', value: "003" },];
    const clientsDataDev = [{ label: 'clientsDataDev 123', value: "111" }, { label: 'clientsDataDev 456', value: "112" }, { label: 'clientsDataDev 789', value: "113" },];

    const [form, setForm] = useState({ buildType: "", branch: [], clients: [] });
    const [dataArray, setDataArray] = useState([]);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (form.buildType === "production") { setDataArray(clientsDataProduct); handleChange([], "clients") }
        else { setDataArray(clientsDataDev); handleChange([], "clients") }
    }, [form.buildType])


    const handleChange = (e, name) => {
        console.log(e, "handleChange",name);
        if (name === "buildType") {
            setForm({
                ...form,
                [name]: e.target.value
            })
        }
        else {
            setForm({
                ...form,
                [name]: e
            })
        }

    }
    const handleSumbit = () => {
        console.log(form, "data");
        if (form.clients.length > 0 && form.buildType && form.branch.length > 0) {
            setOpen(true);
        }
    }

    return (
        <Box sx={{ background: getColors("white") }}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 3 }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ padding: "6px 16px", flex: 1 }}>
                            <CustomizedInputs
                                options={menuArray}
                                value={form.buildType}
                                name={"buildType"}
                                label={"Build Menu"}
                                onChange={(e) => handleChange(e, "buildType")}
                            />
                        </div>
                        <div style={{ padding: "6px 16px", flex: 1 }}>
                            <MultipleSelectChip
                                label={"Clients"}
                                options={dataArray}
                                onChange={(data) => handleChange(data, "clients")}
                                values={form.clients}
                            />
                        </div>
                        <div style={{ padding: "6px 16px", flex: 1 }}>
                            <MultipleSelectChip
                                label={"Branch"}
                                options={branchArray}
                                onChange={(data) => handleChange(data, "branch")}
                                values={form.branch}
                            />
                        </div>
                    </div>

                </div>
                <div style={{ flex: 1, textAlign: "end", padding: "6px 16px", }}>
                    <Button onClick={handleSumbit} label={"Submit"} style={{ top: "50%" }} />
                </div>
            </div>

            <AppModalPopUp open={isOpen} onClose={() => setOpen(false)} title={"WELCOME"} />

        </Box>
    )
}
