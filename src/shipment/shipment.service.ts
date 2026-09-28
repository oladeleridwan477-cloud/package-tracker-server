import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.shipment.findMany({
      include: {
        histories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: {
        trackingNumber,
      },
      include: {
        histories: true,
      },
    });

    if (!shipment) {
      throw new NotFoundException(
        'Shipment not found',
      );
    }

    return shipment;
  }

    async create(data: CreateShipmentDto) {
    try {
      const trackingNumber = data.trackingNumber;

      return await this.prisma.shipment.create({
        data: {
          trackingNumber,
          senderName: data.senderName,
          senderAddress: data.senderAddress,
          receiverName: data.receiverName,
          receiverAddress: data.receiverAddress,
          origin: data.origin,
          destination: data.destination,
          currentLocation: data.currentLocation,
          estimatedDelivery: new Date(data.estimatedDelivery),
          status: "Pending",
        },
      });
    } catch (error) {
      console.error("CREATE SHIPMENT ERROR:", error);
      throw error;
    }
  }
  async update(
  trackingNumber: string,
  data: any,
) {
  const shipment =
    await this.prisma.shipment.findUnique({
      where: {
        trackingNumber,
      },
    });

  if (!shipment) {
    throw new NotFoundException(
      'Shipment not found',
    );
  }

  const updatedShipment =
    await this.prisma.shipment.update({
      where: {
        trackingNumber,
      },
      data: {
        ...data,
      },
    });

  if (
    data.location &&
    data.status &&
    data.description
  ) {
    await this.prisma.trackingHistory.create({
      data: {
        shipmentId: shipment.id,
        location: data.location,
        status: data.status,
        description: data.description,
      },
    });
  }

  return updatedShipment;
}

async delete(
  trackingNumber: string,
) {
  const shipment =
    await this.prisma.shipment.findUnique({
      where: {
        trackingNumber,
      },
    });

  if (!shipment) {
    throw new NotFoundException(
      'Shipment not found',
    );
  }

  return this.prisma.shipment.delete({
    where: {
      trackingNumber,
    },
  });
}
}