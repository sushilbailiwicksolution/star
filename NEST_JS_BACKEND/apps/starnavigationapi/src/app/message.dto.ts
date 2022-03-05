import { Exclude, Expose } from "class-transformer";

export class MessageDto {
    @Expose()
    message: string;
    @Exclude()
    name: string;
}