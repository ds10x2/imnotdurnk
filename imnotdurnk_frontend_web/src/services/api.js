import axios from 'axios';
import { ToastError } from '../components/_common/alert';
import useAuthStore from '../stores/useAuthStore';
import useUserStore from '../stores/useUserStore';

// 게임 등 로그인이 필요없는 api 요청시 사용(토큰없이도 요청 가능한 용)
const apiNoToken = axios.create({
    baseURL: 'http://REMOVED:8080', //로컬용1
    //baseURL: 'https://REMOVED/api', // 원격용1
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
});
const api = axios.create({
    baseURL: 'http://REMOVED:8080', //로컬용2
    //baseURL: 'https://REMOVED/api', // 원격용2
    timeout: 5000, // 5초 내 서버 응답 없으면 요청 취소
    withCredentials: true, // 이게 있어야 refresh Token받을 수 있음
    //zustand로 저장된 accessToken 불러와서 매 요청의 헤더에 넣기
});

//변수 저장 시도
//api 요청 전의 처리
api.interceptors.request.use(
    (config) => {
        // Zustand 이용해 useAuthStore에서 토큰을 가져와서 헤더에 추가
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

let isTokenRefreshing = false; //토큰 요청 상태 저장

//api 요청 후의 처리
api.interceptors.response.use(
    (response) => {
        // const accessToken = response.headers['authorization'];
        // if (accessToken) {
        //     useAuthStore.getState().setAccessToken(accessToken);
        // }
        console.log('요청 어떻게 디었나 ,', response);
        if (response.status === 401) {
            ToastError('로그인이 필요합니다', true);
        }
        return response;
    },
    async (error) => {
        const { config, response } = error;
        const { clearUser } = useUserStore((state) => ({
            clearUser: state.clearUser,
        }));
        const { clearAccessToken } = useAuthStore((state) => ({
            clearAccessToken: state.clearAccessToken,
        }));
        console.log('1', '클리어 어세스 토큰', clearAccessToken);
        if (response.data.statusCode === 401) {
            //AT이 없는 경우 401 에러가 뜸
            const originalRequest = config;

            //AT 재발급 시도
            if (!isTokenRefreshing) {
                isTokenRefreshing = true;
                try {
                    const refreshResponse = await api.get('/auth/refresh', {
                        params: {
                            type: 'access',
                        },
                    });
                    const newAccessToken =
                        refreshResponse.headers['authorization'];
                    useAuthStore.getState().setAccessToken(newAccessToken);
                    originalRequest.headers['Authorization'] = newAccessToken;
                    console.log('재발급 결과', refreshResponse);
                    if (refreshResponse.status === 401) {
                        console.log('재발급 실패', refreshResponse);
                        ToastError('로그인이 필요합니다', true);
                        clearUser();
                        clearAccessToken();
                        window.location.href = '/account';
                    }
                    isTokenRefreshing = false;
                    return api(originalRequest);
                } catch (error) {
                    console.log('error');
                    window.location.href = '/account';
                    ToastError('로그인이 필요합니다', true);
                    clearUser();
                    clearAccessToken();
                    return Promise.reject(error);
                }
            }
        }
        return Promise.reject(error);
    },
);

export { api, apiNoToken };
