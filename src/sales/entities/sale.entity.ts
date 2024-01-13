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

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  billNo: string;

  @CreateDateColumn()
  billDate: Date;

  @CreateDateColumn()
  eWayBillNumber: Date;

  @CreateDateColumn()
  deliveryDate: Date;

  @ManyToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  //   @OneToMany(() => Product)
  //   @JoinColumn()
  //   products: Product[];

  @ManyToOne(() => Admin)
  @JoinColumn()
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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  outStanding: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalTaxableAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  gstAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  roundOff: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;
}
