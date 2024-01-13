import { Auth } from 'src/auth/entities/auth.entity';
import { BaseEntityModel } from 'src/base.schema';
import { Gender } from 'src/enums/gender';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Admin extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  role: string;
}
