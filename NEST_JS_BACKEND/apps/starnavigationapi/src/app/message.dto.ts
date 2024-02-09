import { Exclude, Expose } from "class-transformer";


/**
 * @ignore
 */
export class MessageDto {
    @Expose()
    message: string;
    @Exclude()
    name: string;
}