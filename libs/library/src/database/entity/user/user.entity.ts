import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'nxgen' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
