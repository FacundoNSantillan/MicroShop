import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => new UserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const userId = Number(id);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponseDto(user);
  }

  async findAuthUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    const userId = Number(id);

    await this.findOne(id);

    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return new UserResponseDto(user);
  }

  async remove(id: string) {
    const userId = Number(id);

    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findForAuthByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }


  async updateRefreshToken(userId: number, refreshToken: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async findByIdSafe(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new UserResponseDto(user);
  }

}
