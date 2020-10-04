import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { Organization } from './Organization';

@Entity('companies')
export class Company {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public status: string;

  @Column()
  public org_id: string;

  @ManyToOne(() => Organization)
  public organization: Organization;

  @CreateDateColumn()
  public created_at: Date;
  @CreateDateColumn()
  public updated_at: Date;
}
