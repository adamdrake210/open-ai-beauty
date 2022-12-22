import { PrismaService } from 'nestjs-prisma';
import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, Prisma } from '@prisma/client';
import { HashingService } from 'src/auth/hashing/hashing.service';

const defaultSelectUser = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
  updatedAt: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private readonly hashingService: HashingService
  ) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Pick<User, 'id' | 'email' | 'firstname' | 'lastname'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: defaultSelectUser,
    });
  }

  async findOneUserByIdWPassword(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async findOneUserByEmailWPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
      select: defaultSelectUser,
    });
  }

  async changePassword({
    userId,
    currentPassword,
    newPassword,
  }: ChangePasswordInput) {
    const user = await this.findOneUserByIdWPassword(userId);

    const passwordValid = await this.passwordService.validatePassword(
      currentPassword,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword);

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
      select: defaultSelectUser,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<string> {
    await this.prisma.user.delete({
      where,
    });
    return 'User deleted';
  }

  // token methods
  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await this.hashingService.hash(
      refreshToken
    );
    await this.updateUser(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const isRefreshTokenMatching = await this.hashingService.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: string) {
    return this.updateUser(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
