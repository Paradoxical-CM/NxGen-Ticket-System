import { UserModel } from '@app/library';
import { Transform } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ database: 'nxgen' })
export class TicketModel {
  @PrimaryGeneratedColumn('identity')
  ticket_id: string;

  @Column()
  company: string;

  @Column()
  caller_name: string;

  @Column()
  caller_contact: number;

  @Column()
  onsite_contact: number;

  @Column()
  address: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @Column({ type: 'text' })
  fault_description: string;

  @Column()
  affected_extension: string;

  @Column()
  affected_phone_type: string;

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'id' })
  @Transform(({ value }) => value.username)
  user: UserModel;

  @Column({ type: 'text' })
  remark: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
