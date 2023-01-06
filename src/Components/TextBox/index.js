import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import { getColors } from './../../Core/Utilities/index';

export default function CustomizedInputs({ type = "text", style = {}, rows = 0, multiline = false, disabled = false, 
className = "", value = "", inputProps, autoFocus = false, top = 0, placeholder = "", name = "", propsSet, onChange = () => { }, 
onClick = () => { }, required = false, error = false, label = "" }) {
  return (
    <FormControl style={{ marginTop: top }} fullWidth size='sm' variant="standard">
      <div style={{ fontSize: 13, fontWeight: 'bold' }}>{label} {required ? <span style={{ color: getColors('red') }}>*</span> : null}</div>
      <TextField
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        {...propsSet}
        type={type}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        error={false}
        size="small"
        id={Math.round(new Date().getTime()) + "-input"}
        fullWidth
        style={{ fontSize: 12, display: 'block' }}
        name={name}
        autoFocus={autoFocus}
        InputProps={inputProps}
        value={value}
        className={className}
        autoComplete="off"
        sx={{ ...style }}
      />
      {error ? <div style={{ fontSize: 13, color: getColors('red') }}>{error}</div> : null}
    </FormControl>
  );
}
