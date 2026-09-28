import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTrackingHistoryDto } from "./dto/create-tracking-history.dto";

@Injectable()
export class TrackingHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrackingHistoryDto) {
    const shipment = await this.prisma.shipment.findUnique({
      where: {
        trackingNumber: dto.trackingNumber,
      },
    });

    if (!shipment) {
      throw new NotFoundException("Shipment not found");
    }

    // Save the tracking update
    const history = await this.prisma.trackingHistory.create({
      data: {
        location: dto.location,
        status: dto.status,
        description: dto.description,
        shipmentId: shipment.id,
      },
    });

    // Update the main shipment with the latest information
    await this.prisma.shipment.update({
      where: {
        trackingNumber: dto.trackingNumber,
      },
      data: {
        status: dto.status,
        currentLocation: dto.location,
      },
    });

    return history;
  }

  async findAll(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: {
        trackingNumber,
      },
    });

    if (!shipment) {
      throw new NotFoundException("Shipment not found");
    }

    return this.prisma.trackingHistory.findMany({
      where: {
        shipmentId: shipment.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async remove(id: string) {
    return this.prisma.trackingHistory.delete({
      where: {
        id,
      },
    });
  }
}