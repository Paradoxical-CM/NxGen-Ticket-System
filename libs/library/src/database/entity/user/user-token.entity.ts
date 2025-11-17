import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserModel } from './user.entity';

@Entity({ database: 'nxgen' })
export class UserTokenModel {
  @PrimaryColumn('uuid')
  user_uuid: string;

  @Column({ type: 'varchar' })
  access_token: string;

  @Column({ type: 'varchar' })
  refresh_token: string;

  @OneToOne(() => UserModel, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'id' })
  user: UserModel;
}
