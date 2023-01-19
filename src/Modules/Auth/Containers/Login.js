import React, { useState } from "react";
import AuthLayout from "../Components/AuthLayouts";
import TextBox from "../../../Components/TextBox";
import Button from "./../../../Components/Button/index";
import useRedirect from "../../../Core/Hooks/Redirect";
import { request } from "../../../Core/Services/Request";
import {
  serverValidationError,
  testUrl,
} from "./../../../Core/Utilities/index";
import { attemptAuth } from "../../../Core/Services/Auth";

export default function Login() {
  const { redirectTo } = useRedirect();

  const [isSubmitted] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [input, setInput] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    request(testUrl("auth/login"), input, "POST")
      .then((res) => {
        attemptAuth(res.data);
        return redirectTo("/dashboard");
      })
      .catch((error) => setErrors(error.errors));
  };
  return (
    <div>
      <AuthLayout>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <TextBox
              value={input.username}
              onChange={(event) =>
                setInput({ ...input, username: event.target.value })
              }
              error={serverValidationError(errors?.username)}
              label="username"
              placeholder="Registered username"
              type="username"
            />
          </div>
          <div>
            <TextBox
              value={input.password}
              onChange={(event) =>
                setInput({ ...input, password: event.target.value })
              }
              error={serverValidationError(errors?.password)}
              top={10}
              label="Password"
              placeholder="Password"
              type="password"
            />
          </div>
          <Button
            type="submit"
            style={{ marginTop: 10 }}
            fullWidth
            label="Sign In"
            loading={isSubmitted}
          />
        </form>
      </AuthLayout>
    </div>
  );
}
