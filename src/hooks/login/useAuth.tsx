import {LoginRequest, LoginResponse} from "../../types/API";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {authAPI, EmailCheckRequest} from "../../util/api/login/AuthAPI";
import {setCookie} from "../../util/Cookie";

export const useLogin = () => {
    const queryClient = useQueryClient();

    const loginMutation = useMutation<{status: number, data: LoginResponse | {message: string}}, Error, LoginRequest>({
        mutationFn: (loginData: LoginRequest) => authAPI.login(loginData),
        onSuccess: (data: {status: number, data: LoginResponse | {message: string}}) => {
            queryClient.setQueryData(["loginError"], undefined);
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
                    queryClient.setQueryData(["loginError"], errorData.message);
                    // alert(`${errorData.message}`);
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
    };
}

export const useEmailCheck = () => {
    const queryClient = useQueryClient();

    const emailCheckMutation = useMutation<{ status: number, email: string, message: string }, Error, EmailCheckRequest>({
        mutationFn: (request: EmailCheckRequest) => authAPI.emailCheck(request),
        onSuccess: (response: {status: number, email: string, message: string}) => {

            if (response.status === 200) {
                queryClient.setQueryData(["registerEmail"], response.email);
            } else {
                if (response.status == 409) {
                    queryClient.setQueryData(["registerEmail"], undefined);
                } else if (response.status === 500) {
                    alert("[Server Error] 서버에서 오류가 발생하였습니다. 관리자에게 문의해주십시오.");
                } else {
                    alert("[Client Error] 요청시 오류가 발생하였습니다. 새로고침 이후 다시 시도해주십시오.");
                }
                queryClient.setQueryData(["registerCheckEmailErrorMessage"], response.message);
            }
        }
    })

    return {
        emailCheck: emailCheckMutation.mutate,
        isPending: emailCheckMutation.isPending,
        error: emailCheckMutation.error,
        response: queryClient.getQueryData(["registerEmail"]) as {email: string | undefined},
    };
}