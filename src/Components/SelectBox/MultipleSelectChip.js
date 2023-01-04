import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip({label = "", options = [], values = [], ...props}) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        
        let d = typeof value === 'string' ? value.split(',') : value;
        setPersonName(d);
        props.onChange(d);
    };

    return (
            <FormControl fullWidth size='small' variant="outlined">
                <div style={{fontSize: 13}}>{label}</div>
                <Select
                    {...props} 
                    multiple
                    value={personName}
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value, index) => {
                                let labelSet = options.find(i => i.value === value);
                                if(labelSet) labelSet = labelSet.label;
                                return (
                                    <Chip key={index} label={labelSet} style={getStyles(value, values, theme)} />
                                )
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {options.map((name, index) => (
                        <MenuItem
                            key={index}
                            value={name.value}
                            style={getStyles(name.label, personName, theme)}
                        >
                            {name.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
}
