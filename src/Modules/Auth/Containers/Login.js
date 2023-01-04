import React, { useState } from "react";
import AuthLayout from "../Components/AuthLayouts";
import TextBox from "../../../Components/TextBox";
import Button from './../../../Components/Button/index';
import useRedirect from "../../../Core/Hooks/Redirect";
import { request } from "../../../Core/Services/Request";
import { serverValidationError, url } from './../../../Core/Utilities/index';
import { attemptAuth } from "../../../Core/Services/Auth";

export default function Login() {

    const { redirectTo } = useRedirect();

    const [isSubmitted] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [input, setInput] = useState({ email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            "email": "a@mail.com", "password": "123"
        }
        localStorage.setItem("AUTH_TOKEN", "awsdhdjnckks");
        localStorage.setItem("AUTH_USER", JSON.stringify(user));
        console.log("haaiii")
        redirectTo('/dashboard');

        // request(url('/auth/login'),input,'POST')
        // .then(res => {
        //     console.log(res)
            // attemptAuth(res.result);
        //     return redirectTo('/dashboard');
        // })
        // .catch(error => setErrors(error.errors))

    }
    return (
        <div>
            <AuthLayout>
                <form onSubmit={handleSubmit} noValidate>
                    <div><TextBox value={input.email} onChange={event => setInput({ ...input, email: event.target.value })} error={serverValidationError(errors?.email)} label="Email" placeholder="Registered email" type="email" /></div>
                    <div><TextBox value={input.password} onChange={event => setInput({ ...input, password: event.target.value })} error={serverValidationError(errors?.password)} top={10} label="Password" placeholder="Password" type="password" /></div>
                    <Button type="submit" style={{ marginTop: 10 }} fullWidth label="Sign In" loading={isSubmitted} />
                </form>
            </AuthLayout>
        </div>
    )
}