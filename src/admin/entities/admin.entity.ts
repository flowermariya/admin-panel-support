import { BaseEntityModel } from 'src/base.schema';
import { Gender } from 'src/enums/gender';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other,
  })
  gender: Gender;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  role: string;
}
