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
import { PassportService } from './passport.service';

@Controller('passport')
// @UseGuards(JwtAuthGuard)
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

    // Top Section KPIs
    @Get('/user/:wallet/reputation')
    getReputationScore(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getReputationScore(wallet);
    }

    @Get('/user/:wallet/success-rate')
    getSuccessRate(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getSuccessRate(wallet);
    }

    @Get('/user/:wallet/activity/summary')
    getDaysActive(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getDaysActive(wallet);
    }

    // Tabs
    @Get('/user/:wallet/reputation/history')
    getReputationGrowth(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getReputationGrowth(wallet);
    }

    // DeFi Skills Assessment
    @Get('/user/:wallet/skills/lending')
    getLendingPercentage(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getLendingPercentage(wallet);
    }

    @Get('/user/:wallet/skills/yield-farming')
    getYieldFarmingPercentage(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getYieldFarmingPercentage(wallet);
    }

    @Get('/user/:wallet/skills/staking')
    getStakingPercentage(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getStakingPercentage(wallet);
    }

    @Get('/user/:wallet/skills/liquidity')
    getLiquidityPercentage(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getLiquidityPercentage(wallet);
    }

    @Get('/user/:wallet/skills/protocols')
    getProtocolAdoptionPercentage(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getProtocolAdoptionPercentage(wallet);
    }

    // Protocols
    @Get('/user/:wallet/protocols/history')
    getProtocolHistory(
        @Param('wallet') wallet: string,
    ) {
        return this.passportService.getProtocolHistory(wallet);
    }


}
