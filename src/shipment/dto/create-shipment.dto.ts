import { IsDateString, IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  trackingNumber!: string;

  @IsString()
  senderName!: string;

  @IsString()
  senderAddress!: string;

  @IsString()
  receiverName!: string;

  @IsString()
  receiverAddress!: string;

  @IsString()
  origin!: string;

  @IsString()
  destination!: string;

  @IsString()
  currentLocation!: string;

  @IsDateString()
  estimatedDelivery!: string;
}