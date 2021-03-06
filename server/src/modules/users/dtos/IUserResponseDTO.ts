export interface IUserResponseDTO {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url?: () => string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}