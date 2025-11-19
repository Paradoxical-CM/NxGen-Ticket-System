import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'nxgen' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}
