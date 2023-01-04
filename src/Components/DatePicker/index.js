import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import TextBox from "../TextBox";
import moment from 'moment';

export default function Index({ onSelected = () => { }, label = "", ...props }) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
            <DesktopDatePicker
                error={false}
                open={open}
                onClose={() => setOpen(false)}
                value={value}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                    setValue(newValue);
                    onSelected(moment(newValue).format('YYYY-MM-DD'));
                }}
                renderInput={(params) => <TextBox propsSet={params} label={label} onClick={e => setOpen(!open)}/>}
            />
        </Stack>
    </LocalizationProvider>
  );
}
