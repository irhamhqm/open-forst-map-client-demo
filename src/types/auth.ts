export interface SignInPayload {
    user_name: string;
    user_password: string;
  }

  export interface SignInResponse {
    data: string;
    meta: string;
    status: boolean;
  }

  export interface IsMeResponse {
    data: IsMeData | undefined;
    meta: string;
    status: boolean;
  }

  export interface IsMeData {
    created_at: string;
    pilot_id: number | undefined;
    updated_at: string;
    user_affiliation: string;
    user_display_name: string;
    user_email: string;
    user_id: number;
    user_name: string;
    user_role: string;
  }

  export interface SignUpPayload {
    user_name: string;
    user_email: string;
    user_password: string;
    user_display_name: string;
    user_affiliation: string;
    user_role: string;
    pilot_id: string;
    feature_ids: string;
  }
  
  export interface SignUpResponse {
    data: unknown;
    meta: string;
    status: boolean;
  }

  export interface ForgotPasswordPayload {
    user_email: string;
  }  

  export interface ForgotPasswordResponse {
    data: unknown;
    meta: string;
    status: boolean;
  }