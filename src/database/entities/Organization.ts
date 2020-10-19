import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { User } from '../../modules/userManagement/entities/User';

@Entity('organizations')
export class Organization {
  @PrimaryColumn('text')
  public readonly id: string;
  @Column('text')
  public description: string;
  @OneToMany((type) => User, (user) => user.org_id)
  public user: User;
  @Column('text')
  public status: string;
  @CreateDateColumn({ default: new Date() })
  public created_at: Date;
  @CreateDateColumn({ default: new Date() })
  public updated_at: Date;

  constructor(props: Omit<Organization, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
