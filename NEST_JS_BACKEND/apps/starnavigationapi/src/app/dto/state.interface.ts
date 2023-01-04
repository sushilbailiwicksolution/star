/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { ComparatorDto } from './compare.interface';

/**
 * @ignore
 */
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

/**
 * @ignore
 */
export class Sort {
    @ApiProperty()
    by?: string;
    @ApiProperty()
    reverse?: boolean;
} 

/**
 * @ignore
 */
export class Filter {
    @ApiProperty()
    property?: string;
    @ApiProperty()
    value?: string;
}
/**
 * @ignore
 */
export class StateDto<T = any> {
    @ApiProperty()
    page?: Page;
    @ApiProperty()
    sort?: Sort;
    @ApiProperty({ type: () => Filter })
    filters?: Filter[];
}
