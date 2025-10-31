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
export class PassportService {
    constructor(

    ) {}

    getReputationScore(wallet: any)
    {
      return {
            data: {
              reputationLevel: "Elite"
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getSuccessRate(wallet: any)
    {
      return {
            data: {
              successRate: 98.2
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getDaysActive(wallet: any)
    {
      return {
            data: {
              daysActive: 156
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getReputationGrowth(wallet: any)
    {
      return {
            data: {
              reputationScore: 847
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getLendingPercentage(wallet: any)
    {
      return {
            data: {
              skill: "Lending", 
              score: 85, 
              fullMark: 100
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getYieldFarmingPercentage(wallet: any)
    {
      return {
            data: {
              skill: "Yield Farming", 
              score: 92, 
              fullMark: 100
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getStakingPercentage(wallet: any)
    {
      return {
            data: {
              skill: "Staking", 
              score: 78, 
              fullMark: 100
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getLiquidityPercentage(wallet: any)
    {
      return {
            data: {
              skill: "Liquidity", 
              score: 88, 
              fullMark: 100
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

    getProtocolAdoptionPercentage(wallet: any)
    {
      return {
            data: {
              skill: "Protocol Adoption", 
              score: 90, 
              fullMark: 100
            },
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }


    getProtocolHistory(wallet: any)
    {
      return {
            data:[
              {
                protocol: "Hedera Lending",
                firstUsed: "2024-03-15",
                totalVolume: "$850,000",
                transactions: 45,
                status: "active",
                reputation: 92,
              },
              {
                protocol: "HashPack Yield",
                firstUsed: "2024-03-20",
                totalVolume: "$650,000",
                transactions: 32,
                status: "active",
                reputation: 88,
              },
              {
                protocol: "SaucerSwap",
                firstUsed: "2024-04-01",
                totalVolume: "$420,000",
                transactions: 78,
                status: "active",
                reputation: 85,
              },
              {
                protocol: "Stader Staking",
                firstUsed: "2024-04-15",
                totalVolume: "$380,000",
                transactions: 12,
                status: "active",
                reputation: 90,
              },
            ],
            message: "Latest transactions fetched successfully",
            status: 200
        };
    }

  
}
