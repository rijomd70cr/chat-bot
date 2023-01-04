import React, { useState } from 'react';

import MoreMenu from "../../../Components/MoreMenu";
import NormalDataTable from "../../../Components/AppDataTable/NormalDataTable";
import AppModalPopUp from "../../../Components/AppModalPopUp";
import ProductionBuild from "./ProductionBuild";
import DevUat from "./DevUat";
import { getColors } from '../../../Core/Utilities/index';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";

export default function GitManagement() {

    let data = [
        { Id: "1", Branch: "Branch 1", "Start Time": "11/01/2022", "End Time": "11/01/2022", Status: "staging", },
        { Id: "2", Branch: "Branch 2", "Start Time": "11/01/2022", "End Time": "11/01/2022", Status: "staging", },
    ];//table data
    let options = [
        { label: "More To Pre-Release", value: "preRelease" },
        { label: "Generate Build", value: "productionBuild" },
        { label: "Move To Dev UAT", value: "devUAT" }
    ]; // more menu options

    const [isOpenProductionBuild, setOpenProductionBuild] = useState(false);
    const [isOpenDevUat, setOpenDevUat] = useState(false);

    const [gitItem, setGitItem] = useState({});

    const selectItem = (menu, item) => {
        if (menu === "productionBuild") {
            setOpenProductionBuild(true);
        }
        if (menu === "devUAT") {
            setOpenDevUat(true);
        }
        setGitItem(item);
    }
    const closeModal = () => {
        setOpenProductionBuild(false);
        setOpenDevUat(false);
    }

    return (
        <Box sx={{ background: getColors("white") }}>
            <NormalDataTable
                data={data}
                moreColumns={[
                    {
                        name: "Actions",
                        keyName: "Actions",
                        cell: (row) => {
                            return <MoreMenu component={<MoreVertIcon sx={{ fontSize: "16px" }} />}
                                options={options} selectMenuItem={(item) => selectItem(item, row)}
                            />;
                        }
                    }
                ]}
            />

            <AppModalPopUp open={isOpenProductionBuild || isOpenDevUat} >
                {isOpenProductionBuild && <ProductionBuild data={gitItem} onClose={closeModal} />}
                {isOpenDevUat && <DevUat data={gitItem} onClose={closeModal} />}
            </AppModalPopUp>
        </Box>
    )
}
