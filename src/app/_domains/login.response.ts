export interface LoginResponse {
    login: string;
    accessJws: string;
    refreshJws: string;
    accessJwsExpirationMs: number;
    refreshJwsExpirationMs: number;
}