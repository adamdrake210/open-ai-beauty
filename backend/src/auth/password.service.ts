import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class PasswordService {
  constructor(private readonly hashingService: HashingService) {}

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return this.hashingService.compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return this.hashingService.hash(password);
  }
}
