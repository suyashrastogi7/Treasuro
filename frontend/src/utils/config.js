import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

// const axios = require('axios');
const token = Cookies.get("access-token");
// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
    baseURL: `http://localhost:5000/api`,
    timeout: 10000,
});

export const AxiosPrivate = () => {
    useEffect(() => {
        const requestIntercept = customAxios.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercept = customAxios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const refresh = Cookies.get("refresh-token");
                    const { token } = await axios.post(`/auth/refresh`, {
                        refresh: refresh,
                    });
                    prevRequest.headers["Authorization"] = `Bearer ${token}`;
                    return customAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            customAxios.interceptors.request.eject(requestIntercept);
            customAxios.interceptors.response.eject(responseIntercept);
        };
    }, []);
    return customAxios;
};

// // Step-2: Create request, response & error handlers
// const requestHandler = (request) => {
//     // Token will be dynamic so we can use any app-specific way to always
//     // fetch the new token before making the call
//     request.headers.Authorization = `${token}`;

//     return request;
// };

// const responseHandler = async (response) => {
//     const refresh = Cookies.get("refresh-token");
//     if (!refresh) {
//         window.location = "/signin";
//         Cookies.remove("refresh-token");
//         Cookies.remove("access-token");
//         localStorage.removeItem("access-token");
//     }
//     if (response.status === 401) {
//         // Refresh token
//         try {
//             const { token } = await axios.post(
//                 `${process.env.REACT_APP_URI}api/auth/refresh`,
//                 { refresh: refresh }
//             );
//             Cookies.set("access-token", token.access);
//             Cookies.set("refresh-token", token.refresh);
//             console.log("token refreshed");
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     if (response.status === 403) {
//         window.location.href = "/signin";
//         Cookies.remove("refresh-token");
//         Cookies.remove("access-token");
//         localStorage.removeItem("access-token");
//     }

//     return response;
// };

// const errorHandler = (error) => {
//     return Promise.reject(error);
// };

// // Step-3: Configure/make use of request & response interceptors from Axios
// // Note: You can create one method say configureInterceptors, add below in that,
// // export and call it in an init function of the application/page.
// customAxios.interceptors.request.use(
//     (request) => requestHandler(request),
//     (error) => errorHandler(error)
// );

// customAxios.interceptors.response.use(
//     (response) => responseHandler(response),
//     (error) => responseHandler(error)
// );

// Step-4: Export the newly created Axios instance to be used in different locations.
// export default customAxios;
