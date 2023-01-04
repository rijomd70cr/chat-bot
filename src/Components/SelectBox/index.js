import * as React from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { getColors } from './../../Core/Utilities/index';

export default function CustomizedInputs({top = 0, style = {}, fullWidth = true, disabled = false, error = "", onChange = () => {}, name = "", required = false, options = [], value = "", label = "", placeholder = ""}) {
  return (
    <FormControl style={{marginTop: top, ...style}} fullWidth={fullWidth} size='small' variant="outlined">
        <div style={{fontSize: 13}}>{label} {required ? <span style={{color: getColors('red')}}>*</span> : null}</div>
        <Select disabled={disabled} onChange={onChange} id={Math.round(new Date().getTime()) + "-input"} value={value} fullWidth name={name}>
            {placeholder ? <MenuItem value="">{placeholder || '- Options -'}</MenuItem> : null }
            {options.map((value, index) => <MenuItem key={index} value={value.value}>{value.label}</MenuItem>)}
        </Select>
        {error ? <div style={{fontSize: 13, color: getColors('red')}}>{error}</div> : null}
    </FormControl>
  );
}
