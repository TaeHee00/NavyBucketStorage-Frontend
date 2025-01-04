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

export interface RegisterResponse {
    id: number,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    message: string,
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string,
}

export interface EmailCheckRequest {
    email: string;
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
    },
    emailCheck: async (request: EmailCheckRequest) : Promise<{status: number, email: string, message: string}> => {
        return await fetch(`http://localhost:8080/api/v1/users/check-email?email=${request.email}`, {
            method: "GET",
        }).then(async res => {
            const status = res.status;
            const data: {email: string, message: string} = await res.json();

            return {status, ...data};
        })
    },
    register: async (request: RegisterRequest) : Promise<{status: number, data: RegisterResponse}> => {
        return await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(request),
        }).then(async res => {
            const status = res.status;
            const data = await res.json();
            return {status, data};
        })
    }
}