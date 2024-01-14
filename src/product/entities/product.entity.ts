import { BaseEntityModel } from 'src/utils/base.schema';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product extends BaseEntityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  itemName: string;

  @Column({ type: 'varchar', length: 255 })
  itemImage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  batchCode: string;

  @Column({ type: 'int' })
  qty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mrp: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxValue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  gstPercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  gstAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ type: 'varchar', length: 255 })
  staff: string;
}
