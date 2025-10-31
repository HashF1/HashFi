import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from 'src/common/dto/request/login.dto';
import { RegisterDto } from 'src/common/dto/request/register.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

    // Top KPI Cards
    @Post('/login')
    login(
        @Body() loginDto: LoginDto
    ) {
        return this.userService.login(loginDto);
    }

    @Post('/register')
    register(
        @Body() registerDto: RegisterDto
    ) {
        return this.userService.register(registerDto);
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    profile(
        @Request() req
    ) {
        return this.userService.getUserProfile(req.user.walletAddress);
    }


}
