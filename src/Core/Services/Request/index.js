import { destroyAuth, getAuthToken } from "../Auth";

export const request = (url, body = "", method = "GET", isFile = false) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if(getAuthToken()) {
            myHeaders.append("Authorization", getAuthToken());
        }

        let urlencoded = "";
        if(body) {
            urlencoded = JSON.stringify(body);
        }

        if(isFile) {
            urlencoded = body;
        }

        var requestOptions = {
            method: method,
            headers: myHeaders,
            redirect: 'follow'
        };

        if(method !== "GET") {
            requestOptions.body = urlencoded;
        }

        fetch(url, requestOptions)
        .then(response => {
            if(response.status === 401) {
                destroyAuth();
                return window.location.reload();
            }
            return response.json();
        })
        .then(result => {
            if(result.status) {
                return resolve(result);
            }
            return reject(result);
        })
        .catch(error => reject(error));
    });
}