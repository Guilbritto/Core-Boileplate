import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { ModuleStatus } from '../../../shared/Enun/moduleStatus';
import { User } from '../../userManagement/entities/User';


@Entity('modules')
export class Module {
  @PrimaryColumn('text')
  public readonly id?: string;

  @Column('text')
  public name: string;

  @Column('text')
  public description: string;

  @ManyToOne(() => User, user => user.modules)
  public user: User;

  @Column('text')
  public status?: string;

  @CreateDateColumn({ default: new Date() })
  public created_at?: Date;

  @CreateDateColumn({ default: new Date() })
  public updated_at?: Date;

  constructor(props: Omit<Module, 'id'|'updated_at'|'created_at'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
    if(!this.status){
      this.status = ModuleStatus.ATIVO
    }
  }

  
}
