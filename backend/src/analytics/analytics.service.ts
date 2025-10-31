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

@Injectable()
export class AnalyticsService {
    constructor(

    ) {}

    getTotalReturn(wallet: any)
    {
      return {
            data: {},
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getMaxDrawdown(wallet: any)
    {
      return {
            data: {},
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getWinRate(wallet: any)
    {
      return {
            data: {},
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getPerformanceMetrics(wallet: any)
    {
      return {
            data: [
              { label: "Total Return", value: "+24.8%", change: "+2.1%", trend: "up" },
              { label: "Max Drawdown", value: "-8.3%", change: "-1.2%", trend: "down" },
              { label: "Win Rate", value: "73.2%", change: "+4.5%", trend: "up" },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getPortfolioValueTrend(wallet: any)
    {
      return {
            data: [
              { date: "Jan", value: 95000 },
              { date: "Feb", value: 102000 },
              { date: "Mar", value: 108000 },
              { date: "Apr", value: 115000 },
              { date: "May", value: 120000 },
              { date: "Jun", value: 125000 },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getYieldPerformance(wallet: any)
    {
      return {
            data: [
              { protocol: "SaucerSwap", apy: 12.5 },
              { protocol: "HeliSwap", apy: 8.7 },
              { protocol: "Pangolin", apy: 15.2 },
              { protocol: "Stader", apy: 6.8 },
              { protocol: "HashPack", apy: 18.9 },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }


  
}
