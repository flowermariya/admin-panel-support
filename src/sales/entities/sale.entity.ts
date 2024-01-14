import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { TransactionMode } from 'src/enums/transaction.mode';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { BaseEntityModel } from 'src/utils/base.schema';

@Entity()
export class Sale extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  billNo: string;

  @CreateDateColumn()
  billDate: Date;

  @Column()
  eWayBillNumber: string;

  @CreateDateColumn()
  deliveryDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Admin, (admin) => admin.sales)
  @JoinColumn({ name: 'staffId' })
  staff: Admin;

  @Column({ type: 'varchar', length: 255, nullable: true })
  note: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vehicleNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryCharge: string;

  @Column({
    type: 'enum',
    enum: TransactionMode,
    default: TransactionMode.CASH,
  })
  paymentMode: TransactionMode;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
    default: 0,
  })
  outStanding: number;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalTaxableAmount: number;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
    default: 0,
  })
  gstAmount: number;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
    default: 0,
  })
  discount: number;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
    default: 0,
  })
  roundOff: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;
}
