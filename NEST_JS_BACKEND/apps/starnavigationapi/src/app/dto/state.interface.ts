/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { ComparatorDto } from './compare.interface';

export class Page {
    @ApiProperty()
    from?: number;
    @ApiProperty()
    to?: number;
    @ApiProperty()
    size?: number;
    @ApiProperty()
    current?: number;
}
export class Sort {
    @ApiProperty()
    by?: string;
    @ApiProperty()
    reverse?: boolean;
} 
export class Filter {
    @ApiProperty()
    property?: string;
    @ApiProperty()
    value?: string;
}
export class StateDto<T = any> {
    @ApiProperty()
    page?: Page;
    @ApiProperty()
    sort?: Sort;
    @ApiProperty({ type: () => Filter })
    filters?: Filter[];
}
