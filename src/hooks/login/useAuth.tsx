import {LoginRequest, LoginResponse} from "../../types/API";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {authAPI} from "../../util/api/login/AuthAPI";
import {setCookie} from "../../util/Cookie";

export const useAuth = () => {
    const queryClient = useQueryClient();

    const loginMutation = useMutation<{status: number, data: LoginResponse | {message: string}}, Error, LoginRequest>({
        mutationFn: (loginData: LoginRequest) => authAPI.login(loginData),
        onSuccess: (data: {status: number, data: LoginResponse | {message: string}}) => {
            console.log("success", data);
            queryClient.setQueryData(["loginResponse"], data);

            if (data.status === 200) {
                const successData = data.data as LoginResponse;
                setCookie("accessToken", successData.accessToken, {
                    path: "/",
                    httpOnly: true,
                });
                setCookie("refreshToken", successData.refreshToken, {
                    path: "/",
                    httpOnly: true,
                })

                alert(`[로그인 성공]\naccessToken: ${successData.accessToken}\nrefreshToken: ${successData.refreshToken}\nusername: ${successData.username}\nauthType: ${successData.authType}`);
            } else {
                if (data.status === 500) {
                    alert("[Server Error] 서버에서 오류가 발생하였습니다. 관리자에게 문의해주십시오.");
                } else {
                    const errorData = data.data as {message: string};
                    alert(`${errorData.message}`);
                }
            }
        },
        onError: (error: Error) => {
            console.log("error", error);
            alert("[Server Error] 서버에서 오류가 발생하였습니다. 관리자에게 문의해주십시오.");
        },
    });

    return {
        login: loginMutation.mutate,
        isPending: loginMutation.isPending,
        error: loginMutation.error,
        response: queryClient.getQueryData(["loginResponse"]) as {status: number, data: LoginResponse | {message: string}},
    }
}