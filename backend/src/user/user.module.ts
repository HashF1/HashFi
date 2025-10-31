import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '../common/models/user.model';
import { SecurityService } from 'src/common/services/security.service';
import { JwtStrategy } from 'src/common/guards/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    SecurityService,
    JwtStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}