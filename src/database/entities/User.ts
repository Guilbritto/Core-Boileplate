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
  @PrimaryColumn()
  public readonly id?: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public org_id?: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'org_id' })
  public organization?: Organization;

  @Column()
  public status?: string;

  @CreateDateColumn({ default: new Date() })
  public created_at?: Date;

  @CreateDateColumn({ default: new Date() })
  public updated_at?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
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
