
export const TOKEN_NAME = "AUTH_TOKEN";
export const AUTH_USER = "AUTH_USER";

export const isAuth = () => localStorage.getItem(TOKEN_NAME) !== null;
export const getAuthToken = () => 'Bearer ' + localStorage.getItem(TOKEN_NAME);
export const getAuthUser = (key = "") => {
    let d = JSON.parse(localStorage.getItem(AUTH_USER))
    if(key) {
       d = d[key]; 
    }
    return d;
};

export const destroyAuth = () => {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(AUTH_USER);
}

export const attemptAuth = (data) => {
    localStorage.setItem(TOKEN_NAME, data.access_token);
    localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
}