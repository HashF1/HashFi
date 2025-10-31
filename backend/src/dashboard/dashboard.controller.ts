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
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
// @UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/')
  getSetting() {
    return 'am working setting';
    // return this.dashboardService.getLatestTransactions(wallet);
  }

    // Top KPI Cards
    @Get('/user/:wallet/reputation')
    getReputationScore(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getReputationScore(wallet);
    }

    @Get('/user/:wallet/portfolio/tvl')
    getTotalTVL(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getTotalTVL(wallet);
    }

    @Get('/user/:wallet/yield/monthly')
    getMonthlyYield(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getMonthlyYield(wallet);
    }

    @Get('/user/:wallet/risk')
    getRiskLevel(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getRiskLevel(wallet);
    }

    // Tabs
    @Get('/user/:wallet/reputation/history')
    getReputationTrend(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getReputationTrend(wallet);
    }

    @Get('/user/:wallet/portfolio/distribution')
    getProtocolDistribution(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getProtocolDistribution(wallet);
    }

    @Get('/user/:wallet/portfolio/history')
    getPortfolioValueTrend(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getPortfolioValueTrend(wallet);
    }

    @Get('/user/:wallet/transactions-latest')
    getLatestTransactions(
        @Param('wallet') wallet: string,
    ) {
        return this.dashboardService.getLatestTransactions(wallet);
    }


}
