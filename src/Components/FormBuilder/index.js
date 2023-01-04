import React, { useEffect, useState } from "react";
import TextBox from "../TextBox";
import { Grid } from "@mui/material";
import Button from "../Button";
import SelectBox from "../SelectBox";
import { generateServerSideError } from "../../Core/Utilities";

export default function FormBuilder({ formElements = [], onSubmit = () => { } }) {

    const [reFormData, setReFormData] = useState(formElements);
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        setReFormData(formElements);
        for (let data of formElements) {
            if (data.value) {
                setInput(p => ({
                    ...p,
                    [data.name]: data.value
                }));
            }
        }
    }, [formElements])

    const handleChange = (event) => {
        setInput(p => ({
            ...p,
            [event.target.name]: event.target.value
        }))
    }

    const generateFormElement = (data) => {
        if (data.type === "text" || data.type === "number" || data.type === "email") return <TextBox error={errors[data.name]} onChange={handleChange} {...data} value={input[data.name]} />
        if (data.type === "select") return <SelectBox error={errors[data.name]} onChange={handleChange}  {...data} value={input[data.name]} />
    }

    const errorCallBack = (error) => {
        error = generateServerSideError(error)
        setErrors(error);
        setIsSubmit(false);
    }

    return (
        <form onSubmit={event => {
            event.preventDefault();
            setIsSubmit(true)
            onSubmit(event, input, errorCallBack, () => {
                setErrors({});
                setIsSubmit(false);
                setInput({});
            })
        }}>
            <Grid container spacing={2}>
                {reFormData.map((value, index) => {
                    return (
                        <Grid key={index} item md={value.column || 12}>
                            {generateFormElement(value)}
                        </Grid>
                    )
                })}
                <Grid item md={12} style={{ textAlign: 'right' }}>
                    <Button label="Submit" type="submit" loading={isSubmit} />
                </Grid>
            </Grid>
        </form>
    )
}