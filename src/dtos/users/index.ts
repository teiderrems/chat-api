export interface UsersDto {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber: string;
  profil?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CreateUserDto {
  firstname?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  profil?: string | null;
}

export interface UpdateUserDto {
  firstname?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  profil?: string | null;
}
