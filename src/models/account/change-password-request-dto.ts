export interface ChangePasswordRequestDto {
    email: string;
    newPassword: string;
    currentPassword: string;
  }