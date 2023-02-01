import { PrismaService } from 'nestjs-prisma';
import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, Prisma } from '@prisma/client';
import { HashingService } from 'src/auth/hashing/hashing.service';

const defaultSelectUser = {
  id: true,
  googleId: true,
  email: true,
  pictureUrl: true,
  firstname: true,
  lastname: true,
  favoritePosts: true,
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
  ): Promise<Pick<
    User,
    'id' | 'email' | 'googleId' | 'firstname' | 'lastname'
  > | null> {
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

  async findOneUserByGoogleId(googleId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        googleId,
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
    } else {
      throw new UnauthorizedException();
    }
  }

  async removeRefreshToken(userId: string) {
    return this.updateUser(userId, {
      currentHashedRefreshToken: null,
    });
  }

  // Favorites
  async addFavorite(userId: string, favoriteId: string) {
    const userFavorites = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favoritePosts: true,
      },
    });

    if (userFavorites.favoritePosts.includes(favoriteId)) {
      throw new HttpException(
        'Post is already in favorites',
        HttpStatus.BAD_REQUEST
      );
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favoritePosts: [...userFavorites.favoritePosts, favoriteId],
      },
      select: {
        favoritePosts: true,
      },
    });
  }

  async removeFavorite(userId: string, favoriteId: string) {
    const userFavorites = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favoritePosts: true,
      },
    });

    if (!userFavorites.favoritePosts.includes(favoriteId)) {
      throw new HttpException('Post is not a favorite', HttpStatus.BAD_REQUEST);
    }

    const updatedFavorites = userFavorites.favoritePosts.filter(
      (id) => id !== favoriteId
    );

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favoritePosts: updatedFavorites,
      },
      select: {
        favoritePosts: true,
      },
    });
  }
}
