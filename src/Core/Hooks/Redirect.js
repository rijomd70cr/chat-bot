import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

export default function useRedirect() {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        return navigate(-1);
    }, [navigate]);

    const redirectTo = useCallback((url) => {
        let redirectUrl = url;
        if(window?.app?.urlPrefix) {
        }
        redirectUrl = '/admin' + url;

        navigate(redirectUrl);
    }, [navigate]);

    return {redirectTo, goBack}
}