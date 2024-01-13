import { Admin } from 'src/admin/entities/admin.entity';
import { BaseEntityModel } from 'src/utils/base.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Auth extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Admin)
  @JoinColumn()
  admin: Admin;
}
