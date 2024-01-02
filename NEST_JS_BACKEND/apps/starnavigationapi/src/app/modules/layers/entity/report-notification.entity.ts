import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity({name: "report_notifications"})
export class ReportNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  report: string;

  @Column()
  createdBy:string;
 
  @Column()
  customerId:number;


  @Column('simple-array' ) 
  notificationIds: number[];
}
