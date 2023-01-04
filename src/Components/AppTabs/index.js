import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./style.css"
import { useSearchParams } from "react-router-dom";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ sections = [] }) {

    let [searchParams, setSearchParams] = useSearchParams();

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        let tab = sections.findIndex(i => i.label === searchParams.get('tab'));
        if(tab >= 0)
        setValue(tab);
    }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {sections.map((value, index) => {
                        return <Tab onClick={event => {
                            setSearchParams("tab=" + value.label);
                        }} key={index} label={value.label} {...a11yProps(index)} />
                    })}
                    
                </Tabs>
            </Box>
            {sections.map((item, index) => {
                return (
                    <TabPanel value={value} key={index} index={index}>
                        {item.component}
                    </TabPanel>
                )
            })}
        </Box>
    );
}
