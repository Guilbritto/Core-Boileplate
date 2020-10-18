import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { Organization } from './Organization';
import { hash } from 'bcryptjs';
@Entity('users')
export class User {
  @PrimaryColumn('text')
  public readonly id?: string;

  @Column('text')
  public name: string;

  @Column('text')
  public email: string;

  @Column('text')
  public password: string;

  @Column('text')
  public org_id?: string;

  @Column('text')
  public forgot_code?: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'org_id' })
  public organization?: Organization;

  @Column('text')
  public status?: string;

  @CreateDateColumn({ default: new Date() })
  public created_at?: Date;

  @CreateDateColumn({ default: new Date() })
  public updated_at?: Date;

  constructor(props: Omit<User, 'id'|'updated_at'|'created_at'|'status'|'organization'|'forgot_code'| 'org_id'| 'validate' >, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
      this.status = 'PENDENTE';
    }
  }

  @BeforeInsert()
  async validate() {
    this.password = await hash(this.password, 8);
  }
}
