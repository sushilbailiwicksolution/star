/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { StateDto } from '../dto/state.interface';

@Injectable()
export class QueryBuilder {
    public getQuery(state: StateDto, queryBuilder: SelectQueryBuilder<any>): SelectQueryBuilder<any> {
        this.filter(state, queryBuilder);
        this.sort(state, queryBuilder);
        return queryBuilder;
    }
    private filter(state: StateDto, queryBuilder: SelectQueryBuilder<any>) {
        if (typeof state.filters !== 'undefined') {
            queryBuilder.where("t."+state.filters[0].property+" like '%"+state.filters[0].value+"%'");
            if (state.filters.length > 1) {
                for (let i = 1; i < state.filters.length; i++) {
                    queryBuilder.where("t."+state.filters[i].property+" like '%"+state.filters[i].value+"%'");
                }
            }
        }
        return queryBuilder;
    }
    private sort(state: StateDto, queryBuilder: SelectQueryBuilder<any>) {
        if (typeof state.sort !== 'undefined') {
            queryBuilder.addOrderBy(`t.${state.sort.by}`, state.sort.reverse ? 'DESC': 'ASC');
        }
        return queryBuilder;
    }
}
