import jwt_decode from "jwt-decode";


const apiBaseUrl = process.env.REACT_APP_PUBLIC_API_URL ? process.env.REACT_APP_PUBLIC_API_URL : "http://localhost:7001"

export const request = (
    url: string,
    method: string,
    payload?: any,
    headers?: any
) => {
    headers = headers || {};
    // let token = getToken()

    let token = getToken().accessToken

    console.log(token)

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    url = apiBaseUrl + url;

    let req = fetch(url, {
        method,
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(payload),
    })
    req.then(async (response) => {
        await checkTokenStatus(response);
        return response;
    })

    return req
};


export const getToken = () => {

    let accessToken = localStorage.getItem("accessToken")
    let refreshToken = localStorage.getItem("refreshToken")

    if ((accessToken !== '' && accessToken !== undefined) && (refreshToken !== '' && refreshToken !== undefined)) {
        return { accessToken, refreshToken }
    }
    return { accessToken, refreshToken }

}

export const setToken = (token: any) => {
    if (token) {
        localStorage.setItem("accessToken", token.accessToken)
        localStorage.setItem("refreshToken", token.refreshToken)
    }
}

export const isLoggedIn = () => {
    let { accessToken, refreshToken } = getToken();
    if (accessToken && refreshToken) {
        return true;
    }
    // checkTokenStatus()
    return false;
}

export const getUserProfileImage = () => {
    // @ts-ignore
    return decodeToken()?.profile_image;

}

export const unsetToken = () => {
    localStorage.setItem("accessToken", '')
    localStorage.setItem("refreshToken", '')
}


export const renewToken = async (url: string) => {
    let token = getToken().refreshToken

    console.log('renewToken', token);

    url = apiBaseUrl + url;

    return fetch(url, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
};

export const checkTokenStatus = async (response: any) => {
    console.log('msg', '');

    if (response.status === 403) {
        console.log('msg', 'access token expired');
        // try to renew token

        let res = await renewToken("/auth/renew");
        if (res.status === 200) {
            let { data }: any = await res.json();
            console.log('msg', data);
            setToken({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            })
        } else {
            // reset token
            setToken({
                accessToken: "",
                refreshToken: "",
            })
            window.location.reload();
        }
    }
}


export const decodeToken = () => {
    try {
        let token = getToken().accessToken;
        // console.log(" test Token", token)
        if (typeof token === "string") {
            let decoded = jwt_decode(token);
            return decoded;
            //console.log('get roles', decoded);
        }
    } catch (err) {

    }

    return;
}


export const getLoggedUserRoles = () => {
    // @ts-ignore
    return decodeToken()?.roles;
}

export const getLoggedUserId = () => {
    // @ts-ignore
    return decodeToken()?.id;
}


export const requestFileUpload = (
    url: string,
    method: string,
    payload?: any,
    headers?: any
) => {
    headers = headers || {};
    let token = getToken().accessToken;
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    url = apiBaseUrl + url;

    let req = fetch(url, {
        method,
        mode: "cors",
        cache: "no-cache",
        headers: {
            ...headers,
        },
        body: payload,
    });

    req.then(async (response) => {
        await checkTokenStatus(response);
        return response;
    })

    return req;

};

export const post = (url: string, payload: any) => {
    return request(url, "POST", payload);
};

export const put = (url: string, payload: any) => {
    return request(url, "PUT", payload);
};

export const get = (url: string) => {
    return request(url, "GET");
};

export const postFile = (url: string, payload: any) => {
    return requestFileUpload(url, "POST", payload);
};

export const putFile = (url: string, payload: any) => {
    return requestFileUpload(url, "PUT", payload);
};

export const del = (url: string) => {
    return request(url, "DELETE");
};

export const patch = (url: string, payload: any) => {
    return request(url, "PATCH", payload);
};

export const deleteItem = (url: string) => {
    return request(url, "DELETE");
};

export const update = (url: string, paylad: any) => {
    return request(url, "PATCH", paylad);
};
