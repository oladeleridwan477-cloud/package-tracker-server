import { Module } from "@nestjs/common";
import { TrackingHistoryController } from "./tracking-history.controller";
import { TrackingHistoryService } from "./tracking-history.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [TrackingHistoryController],
  providers: [
    TrackingHistoryService,
    PrismaService,
  ],
})
export class TrackingHistoryModule {}