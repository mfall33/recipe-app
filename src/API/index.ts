import axios from 'axios';
import { BASE_URL } from '../../config';
import { useSelector } from 'react-redux';
import { store } from '../Redux/Store';
import { Alert } from 'react-native/types';
import { setAccessToken, setRefreshToken } from '../Redux/Store/authStore';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {

        const { auth } = store.getState();
        const { accessToken } = auth;

        if (accessToken) {
            config.headers["x-access-token"] = accessToken;
        }

        return config;

    }, (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    async (res) => {
        const originalConfig = res.config;

        const { auth } = store.getState();
        const { refreshToken } = auth;

        if (res.status === 401) {

            try {

                const response = await instance.post("/auth/refreshtoken", {
                    refreshToken: refreshToken,
                });

                store.dispatch(setRefreshToken(response?.data?.refreshToken))
                store.dispatch(setAccessToken(response?.data?.accessToken))

                const newInstance = axios.create(originalConfig);

                alert("OriginalConfig: " + JSON.stringify(originalConfig))


                console.log("access: " + response.data.accessToken);
                console.log("refresh: " + response.data.refreshToken);
                

                originalConfig.headers['x-access-token'] = response.data.accessToken;

                console.log("newly created access token: " + JSON.stringify(response.data.accessToken))

                // use the new instance to resend the original request
                return newInstance(originalConfig);

            } catch (e) {
                alert(e)
            }

        }

        return res;
    }
)

//   REQUEST interceptor
/*  
Is supposed to check if we have an access token and if we do it should retrieve it and apply it to our body or headers

SHOULD CHECK OUR AUTH STORE FOR TOKEN

*/

// RESPONSE interceptor
/* 
Is supposed to check if our request fails with a 403 error (unauthorized)

If the request does fail in the above case.. the interceptor should send a request to /api/auth/refreshToken 

If the above endpoint returns a new accessToken then it must be stored and the original request must be fired off again with an updated access token

If the refreshToken is EXPIRED the any 'authenticated' or 'loggedIn' variable in the AuthStore must be set to false

MUST DISPATCH ACTION TO UPDATE OUR AUTH CREDENTIALS (ACCESS AND REFRESH TOKENS)
*/
export default instance;