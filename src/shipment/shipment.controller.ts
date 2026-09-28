import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shipments')
export class ShipmentController {
  constructor(
    private readonly shipmentService: ShipmentService,
  ) {}

  // Admin only
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.shipmentService.findAll();
  }

  // Public customer tracking
  @Get(':trackingNumber')
  findOne(
    @Param('trackingNumber') trackingNumber: string,
  ) {
    return this.shipmentService.findOne(
      trackingNumber,
    );
  }

  // Admin only
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createShipmentDto: CreateShipmentDto,
  ) {
    return this.shipmentService.create(
      createShipmentDto,
    );
  }

  // Admin only
  @Patch(':trackingNumber')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('trackingNumber') trackingNumber: string,
    @Body() body: any,
  ) {
    return this.shipmentService.update(
      trackingNumber,
      body,
    );
  }

  // Admin only
  @Delete(':trackingNumber')
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('trackingNumber') trackingNumber: string,
  ) {
    return this.shipmentService.delete(
      trackingNumber,
    );
  }
}