import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { Company } from './Company';

@Entity('divisions')
export class Division {
  @PrimaryColumn('text')
  public readonly id: string;

  @Column('text')
  public description: string;

  @Column('text')
  public status: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'comp_id' })
  public company: Company;

  @Column('text')
  public comp_id: string;

  @CreateDateColumn({ default: new Date() })
  public created_at: Date;

  @CreateDateColumn({ default: new Date() })
  public updated_at: Date;

  constructor(props: Omit<Division, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
