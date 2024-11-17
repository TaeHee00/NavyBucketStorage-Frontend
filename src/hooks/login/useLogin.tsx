import {useCallback, useState} from "react";
import {API, AuthType} from "../../enums/API";
import {LoginRequest, LoginResponse} from "../../types/API";

type StateType<T = any> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

const useLogin = (requestType: API, data: LoginRequest)=> {
    const [loginState, setLoginState] = useState<StateType<LoginResponse>>({
        data: {
            accessToken: "",
            refreshToken: "",
            username: "",
            authType: AuthType.NONE,
        },
        loading: false,
        error: null
    });

    const run = useCallback(async () => {
        switch (requestType) {
            case API.LOGIN:
                loginState.loading = true;

                 await fetch("http://localhost:8080/api/v1/auth", {
                    method: "POST",
                    body: JSON.stringify({
                        "email": data.id,
                        "password": data.password,
                    })
                }).then(res => res.json())
                     .then(res => {
                         if (res.status === 200) { // Login Success
                             setLoginState((prev) => ({
                                 ...prev,
                                 loading: false,
                                 error: null,
                                 data: res,
                             }));
                         } else { // error
                            // Logic: loginState.error이 null이 아닐 경우 Login Form에서 메시지를 띄우기 위해 500에러일 경우에는
                            //          error 데이터 추가 대신 알림으로 처리
                             if (res.status === 500) { // Server Error
                                alert("[Server Error] 지속적으로 같은 문제가 발생할 경우 관리자에게 연락부탁드립니다.");
                             } else { // Invalid Request
                                 setLoginState((prev) => ({
                                     ...prev,
                                     loading: false,
                                     error: res.data.message,
                                     data: {
                                         accessToken: "",
                                         refreshToken: "",
                                         username: "",
                                         authType: AuthType.NONE,
                                     },
                                 }));
                             }
                         }
                     });
        }
    }, [requestType, loginState, data.id, data.password]);

    return {...loginState, run};
}

export default useLogin;