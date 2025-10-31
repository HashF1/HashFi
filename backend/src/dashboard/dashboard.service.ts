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
export class DashboardService {
    constructor(

    ) {}

    getReputationScore(wallet: any)
    {
      return {
            data: {
              reputationScore: 847,
              scoreChange: "+12",
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getTotalTVL(wallet: any)
    {
      return {
            data: {
              totalTVL: 125000,
              scoreChange: "+8.2",
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getMonthlyYield(wallet: any)
    {
      return {
            data: {
              monthlyYield: 18750,
              scoreChange: "+12.5",
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getRiskLevel(wallet: any)
    {
      return {
            data: {
              riskLevel: "Low",
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getReputationTrend(wallet: any) {
      return {
            data: [
              { date: "Jan", score: 720 },
              { date: "Feb", score: 745 },
              { date: "Mar", score: 780 },
              { date: "Apr", score: 810 },
              { date: "May", score: 825 },
              { date: "Jun", score: 847 },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getProtocolDistribution(wallet: any) {
      return {
            data: [
              { name: "Lending", value: 45, color: "oklch(0.55 0.15 250)" },
              { name: "Yield Farming", value: 30, color: "oklch(0.45 0.12 190)" },
              { name: "Staking", value: 15, color: "oklch(0.35 0.12 240)" },
              { name: "Liquidity", value: 10, color: "oklch(0.65 0.18 200)" },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getPortfolioValueTrend(wallet: any) {
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

    getLatestTransactions(wallet: any) {
      return {
            data: [
                { type: "Deposit", protocol: "SaucerSwap", amount: "$5,000", date: "2024-06-15", status: "Completed" },
                { type: "Yield Claim", protocol: "HeliSwap", amount: "$320", date: "2024-06-14", status: "Completed" },
                { type: "Stake", protocol: "Stader", amount: "$2,500", date: "2024-06-13", status: "Completed" },
                { type: "Withdraw", protocol: "Pangolin", amount: "$1,200", date: "2024-06-12", status: "Completed" },
                { type: "Swap", protocol: "HashPack", amount: "$800", date: "2024-06-11", status: "Completed" },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    

  
}
