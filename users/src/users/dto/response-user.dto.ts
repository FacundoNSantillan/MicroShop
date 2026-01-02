import { Role } from '@prisma/client';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: {
    id: number;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}