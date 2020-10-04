import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { uuid } from 'uuidv4';
import { Company } from './Company';

@Entity('divisions')
export class Division {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public description: string;

  @Column()
  public status: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'comp_id' })
  public company: Company;

  @Column()
  public comp_id: string;

  @CreateDateColumn()
  public created_at: Date;

  @CreateDateColumn()
  public updated_at: Date;

  constructor(props: Omit<Division, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
