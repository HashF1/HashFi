import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportController } from './passport.controller';
import { PassportService } from './passport.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([

    // ]),
  ],
  controllers: [PassportController],
  providers: [PassportService],
  exports: [PassportService],
})
export class PassportModule {}