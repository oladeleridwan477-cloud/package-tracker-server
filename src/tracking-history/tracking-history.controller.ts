import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { TrackingHistoryService } from './tracking-history.service';
import { CreateTrackingHistoryDto } from './dto/create-tracking-history.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tracking-history')
export class TrackingHistoryController {
  constructor(
    private readonly trackingHistoryService: TrackingHistoryService,
  ) {}

  // Admin only
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateTrackingHistoryDto,
  ) {
    return this.trackingHistoryService.create(dto);
  }

  // Public customer tracking
  @Get(':trackingNumber')
  findAll(
    @Param('trackingNumber') trackingNumber: string,
  ) {
    return this.trackingHistoryService.findAll(
      trackingNumber,
    );
  }
}