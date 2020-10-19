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
  @PrimaryColumn('text')
  public id: string;

  @Column('text')
  public name: string;

  @Column('text')
  public status: string;

  @Column('text')
  public org_id: string;

  @ManyToOne(() => Organization)
  public organization: Organization;

  @CreateDateColumn({ default: new Date() })
  public created_at: Date;
  @CreateDateColumn({ default: new Date() })
  public updated_at: Date;
}
