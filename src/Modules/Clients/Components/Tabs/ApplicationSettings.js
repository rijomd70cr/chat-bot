import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import NormalDataTable from "../../../../Components/AppDataTable/NormalDataTable";
import Button from "../../../../Components/Button";
import TextBox from "../../../../Components/TextBox";
import Title from "../../../../Components/Title";
import { notification } from "../../../../Core/Services/Redux/AppAction";
import { saveApplicationSettings } from "../../Reducer/Actions";

export default function ApplicationSettings({ id, dataKey = "", settings = {}, data = [], title = "", onsubmit = () => { } }) {
    const [input, setInput] = useState({ ...settings });
    const [isSubmit, setIsSubmit] = useState(false);
    const [fieldData] = useState(data);
    const [file, setFile] = useState()
    const fileRef = useRef(null);

    const handleChange = (event) => {
        setInput(p => ({
            ...p,
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {
    }, [])

    const dispatch = useDispatch();

    const handleSaveSettings = () => {
        setIsSubmit(true);
        dispatch(saveApplicationSettings(id, {
            [dataKey]: input
        }))
            .then(res => {
                setIsSubmit(false);
                dispatch(notification(res.message, true))
                onsubmit(res)
            })
    }
    const uploadFile = (e) => {
        fileRef.current.click();
    }
    const handleChangeFile = (e) => {
            setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '100%' }}><Title title={`${title} (${fieldData.length})`} /></div>
                <div style={{ width: '100%', textAlign: 'right', marginBottom: 5, marginTop: -5 }}>
                    <Button label="Save" loading={isSubmit} onClick={handleSaveSettings} />
                    <input ref={fileRef} style={{ display: "none" }} accept=".exe" type="file" onChange={handleChangeFile} />
                    <Button style={{ marginLeft: "10px" }} label="Upload" loading={isSubmit} onClick={uploadFile} />
                </div>
            </div>
            <NormalDataTable
                data={fieldData}
                changeData={
                    [
                        {
                            name: 'label',
                            width: '120px',
                            selector: row => row.label
                        },
                        {
                            name: 'key',
                            width: '120px',
                            selector: row => row.key
                        },
                        {
                            name: 'description',
                            width: '250px',
                            selector: row => row.description
                        },
                        {
                            name: 'value',
                            width: '350px',
                            cell: (row) => {
                                return <TextBox type={row.type} onChange={handleChange} name={row.key} style={{ marginTop: 5, marginBottom: 5 }} value={input[row.key]} placeholder={`${row.label} - ${row.key}`} />;
                            }
                        }
                    ]
                }
            />
        </div>
    )
}