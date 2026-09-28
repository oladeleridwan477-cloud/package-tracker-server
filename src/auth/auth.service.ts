import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ) {
    const admin =
      await this.prisma.admin.findUnique({
        where: {
          username,
        },
      });

    if (!admin) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        admin.password,
      );

    if (!validPassword) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const token = this.jwt.sign({
      id: admin.id,
      username: admin.username,
    });

    return {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };
  }
}