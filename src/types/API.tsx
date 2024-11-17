import {AuthType} from "../enums/API";

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    username: string;
    authType: AuthType;
}

export type LoginRequest = {
    id: string;
    password: string;
}