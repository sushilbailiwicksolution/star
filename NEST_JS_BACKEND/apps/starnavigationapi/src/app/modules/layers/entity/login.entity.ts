import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


/**
 * This is login entity
 * Contains login fields  creates new login into database
 */

@Entity( {name:'userlogin'})
export class UserLogin {
    static map() {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;
    
    // @Column()
    // role : string;
    
    // @Column()
    // age: number;

    // async validateLogin(password: string): Promise<boolean>{
    //     return password===this.password?true:false
    // }
}