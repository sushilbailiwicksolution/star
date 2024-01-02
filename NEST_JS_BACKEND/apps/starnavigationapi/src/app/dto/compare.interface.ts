/**
 * @ignore
 */
export interface ComparatorDto<T> {
    compare(a: T, b: T): number;
}