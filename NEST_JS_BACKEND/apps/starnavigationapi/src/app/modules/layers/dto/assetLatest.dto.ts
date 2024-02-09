import { ApiProperty } from '@nestjs/swagger';

export class Aircraft {
  @ApiProperty({ example: '16', description: 'Asset ID' })
  asset_id: string;

  @ApiProperty({ example: '16-2023-02-18-20', description: 'Aircraft ID' })
  aircraftid: string;

  @ApiProperty({ example: '2023-02-18 20:13:53', description: 'Start event time' })
  start_event_time: string;

  @ApiProperty({ example: '2023-02-18 21:27:08', description: 'Stop event time' })
  stop_event_time: string;

  @ApiProperty({ example: 'ON-GROUND', description: 'Current status' })
  current_status: string;

  @ApiProperty({ example: '24.9622', description: 'GPS latitude' })
  gps_lat: string;

  @ApiProperty({ example: '46.7145', description: 'GPS longitude' })
  gps_long: string;

  @ApiProperty({ example: '8.3750', description: 'Speed' })
  speed: string;

  @ApiProperty({ example: '57.8523', description: 'Heading' })
  heading: string;

  @ApiProperty({ example: '2023-02-18 21:27:08', description: 'Date and time' })
  date_time: string;

  @ApiProperty({ example: { days: '42', hours: 10, minutes: 0 }, description: 'Elapsed time' })
  elapsed_time: {
    days: string;
    hours: number;
    minutes: number;
  };
}
