export interface AuthResponseDto {
    token: string;
    isSuccess: true;
    message: string;
    refreshToken: string;
    isTfaEnabled : boolean;
    isTfaSuccess : boolean;
  }