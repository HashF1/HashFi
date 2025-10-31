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
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
// @UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

    // Top KPI Cards
    @Get('/user/:wallet/analytics/return')
    getTotalReturn(
        @Param('wallet') wallet: string,
    ) {
        return this.analyticsService.getTotalReturn(wallet);
    }

    @Get('/user/:wallet/analytics/drawdown')
    getMaxDrawdown(
        @Param('wallet') wallet: string,
    ) {
        return this.analyticsService.getMaxDrawdown(wallet);
    }

    @Get('/user/:wallet/win-rate')
    getWinRate(
        @Param('wallet') wallet: string,
    ) {
        return this.analyticsService.getWinRate(wallet);
    }

    @Get('/user/:wallet/performance-metrics')
    getPerformanceMetrics(
        @Param('wallet') wallet: string,
    ) {
        return this.analyticsService.getPerformanceMetrics(wallet);
    }

    // Charts
    @Get('/user/:wallet/portfolio/history')
    getPortfolioValueTrend(
        @Param('wallet') wallet: string,
    ) {
        return this.analyticsService.getPortfolioValueTrend(wallet);
    }

    // Tabs
    @Get('/user/:wallet/analytics/yield-performance')
    getYieldPerformance(
        @Param('wallet') wallet: string,
    ) {
        return this.analyticsService.getYieldPerformance(wallet);
    }

}
