import {AuthType} from "../../../enums/API";

export interface LoginRequest {
    id: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
    authType: AuthType;
}

export const authAPI = {
    login: async (request: LoginRequest) : Promise<{ status: number, data: LoginResponse | {message: string} }> => {
        return await fetch("http://localhost:8080/api/v1/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                "email": request.id,
                "password": request.password,
            })
        }).then(async res => {
            const status = res.status;
            const data: LoginResponse = await res.json();

            return {status, data};
        });
    }
}