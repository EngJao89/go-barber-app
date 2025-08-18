export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  created_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
} 
