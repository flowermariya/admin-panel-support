import { TransactionMode } from 'src/enums/transaction.mode';
import { BaseEntityModel } from 'src/utils/base.schema';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryAddress: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({
    type: 'enum',
    enum: TransactionMode,
    default: TransactionMode.CASH,
  })
  transactionMode: TransactionMode;

  @Column({ type: 'boolean', default: false })
  isIGST: boolean;
}
