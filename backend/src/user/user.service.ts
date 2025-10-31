import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../common/models/user.model';
import { LoginDto } from 'src/common/dto/request/login.dto';
import { RegisterDto } from 'src/common/dto/request/register.dto';
import { SecurityService } from 'src/common/services/security.service';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private readonly securityService: SecurityService,
    ) {}

    async register(registerDto: RegisterDto) {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ walletAddress: registerDto.walletAddress });
      if (existingUser) {
        throw new ConflictException('User already registered');
      }
      // Create new user
      const newUser = new this.userModel({ 
        walletAddress: registerDto.walletAddress, 
        username: registerDto.walletAddress, 
        joinDate: new Date().toISOString() 
      });

      if(registerDto.walletType) {
        newUser.walletType = registerDto.walletType;
      }
      
      if(registerDto.chain) {
        newUser.chain = registerDto.chain;
      }

      const userDetail = await newUser.save();

      return {
        data: {
            address: userDetail.walletAddress,
            username: userDetail.username,
            joinDate: userDetail.createdAt,
            avatar: userDetail.avatar,
            reputationScore: userDetail.reputationScore,
            reputationLevel: userDetail.reputationLevel,
            successRate: userDetail.successRate,
            daysActive: userDetail.daysActive,
        },
        message: "User registered successfully",
        status: 201,
      };
    }

  async login(loginDto: LoginDto) {
    // Find user by wallet address
    const user = await this.userModel.findOne({ walletAddress: loginDto.walletAddress });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const filterData = {
      id: user.id,
      walletAddress: user.walletAddress,
      username: user.username,
      joinDate: user.createdAt,
    };
    
    const token = await this.securityService.generateToken(filterData);

    return {
      data: {
            address: user.walletAddress,
            username: user.username,
            joinDate: user.createdAt,
            avatar: user.avatar,
            reputationScore: user.reputationScore,
            reputationLevel: user.reputationLevel,
            successRate: user.successRate,
            daysActive: user.daysActive,
            token: token,
        },
      message: "Login successful",
      status: 200,
    };
  }

    async getUserProfile(wallet: any) {
      const user = await this.userModel.findOne({ address: wallet }).lean();
      if (!user) {
        return {
          data: null,
          message: "User not found",
          status: 404,
        };
      }
      return {
        data: {
            address: user.walletAddress,
            username: user.username,
            joinDate: user.createdAt,
            avatar: user.avatar,
            reputationScore: user.reputationScore,
            reputationLevel: user.reputationLevel,
            successRate: user.successRate,
            daysActive: user.daysActive,
        },
        message: "User profile fetched successfully",
        status: 200,
      };
      // return {
      //       data: {
      //         address: "0x1234...5678",
      //         username: "DeFi Pioneer",
      //         joinDate: "March 2024",
      //         avatar: "/defi-user-avatar.png",
      //         reputationScore: 847,
      //         reputationLevel: "Elite",
      //         successRate: 98.2,
      //         daysActive: 156,
      //       },
      //       message: "User profile fetched successfully",
      //       status: 200
      //   };
    }

    async findOne(wallet: any) {
      const user = await this.userModel.findOne({ address: wallet }).lean();
      if (!user) {
        return {
          data: null,
          message: "User not found",
          status: 404,
        };
      }

      return user;
    }


  
}
