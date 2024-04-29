export interface TfaDto {
    email: string;
    code: string;
    refreshToken :string | null;
}