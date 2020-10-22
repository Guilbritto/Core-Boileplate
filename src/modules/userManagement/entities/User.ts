import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { UserStatus } from '../../../shared/Enun/userStatus';
import { Module } from '../../marketPlace/entities/Modules';


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
  public forgot_code?: string;

  @Column('text')
  public status?: string;

  @OneToMany(() => Module, module => module.user)
  public modules?: Module[];
  
  @CreateDateColumn({ default: new Date() })
  public created_at?: Date;

  @CreateDateColumn({ default: new Date() })
  public updated_at?: Date;

  constructor(props: Omit<User, 'id'|'modules'|'updated_at'|'created_at'|'status'|'organization'|'forgot_code'| 'org_id' >, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
      this.status = UserStatus.PENDENTE;
    }
  }

  
}
