import type { Role } from "@/models/role.model";
import type { User } from "@/models/user.model";

/**
 * Customer Profile Information
 */
export interface CustomerProfile {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  phone: string;
  avatar_url: string;
  address: string;
  is_verified: boolean;
}

/**
 * Update Customer Profile Request
 */
export interface UpdateCustomerProfileRequest {
  email: string;
  name?: string;
  phone: string;
  address?: string;
  avatar_url?: string;
}

/**
 * Change Password Request
 */
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

/**
 * Customer Profile Response
 */
export interface CustomerProfileResponse {
  success: boolean;
  data: CustomerProfile;
}

/**
 * Customer Authentication Profile (simplified for auth and UI)
 */
export interface CustomerAuthProfile {
  id: string;
  email?: string;
  phone: string;
  name: string;
  avatar_url?: string;
  address?: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: null;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface ResendTokenRequest {
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  avatar_url: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar_url: string;
  createdAt: string;
}



export type AdminLoginRequest = {
  email: User["email"];
  password: string;
};

export type AdminRoleLike = {
  role?: Role["code"];
  role_code?: Role["code"];
  scope?: Role["scope"];
  franchise_id?: string | null;
  franchise_name?: string | null;
};

export type AdminLoginUserProfile = {
  id: User["id"] | string;
  email: User["email"];
  phone: User["phone"];
  name: User["name"];
  avatar_url?: string;
  avatarUrl?: User["avatar_url"];
  roles?: AdminRoleLike[];
};

export type AdminLoginResponse = {
  success: boolean;
  data: {
    user: AdminLoginUserProfile;
    token: string;
    roles?: AdminRoleLike[];
  } | null;
  message?: string;
};

export type AdminProfileResponse = {
  success: boolean;
  data:
    | {
        user: AdminLoginUserProfile;
        roles?: AdminRoleLike[];
        active_context?: {
          role: Role["code"];
          scope: Role["scope"];
          franchiseId: string | null;
        };
      }
    | AdminLoginUserProfile
    | null;
  message?: string;
};
