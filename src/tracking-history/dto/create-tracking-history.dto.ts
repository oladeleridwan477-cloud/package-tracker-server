import { IsString } from "class-validator";

export class CreateTrackingHistoryDto {
  @IsString()
  trackingNumber!: string;

  @IsString()
  location!: string;

  @IsString()
  status!: string;

  @IsString()
  description!: string;
}