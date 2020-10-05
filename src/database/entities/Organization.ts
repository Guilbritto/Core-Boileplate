import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { v4 } from 'uuid';
import { User } from './User';

@Entity('organizations')
export class Organization {
  @PrimaryColumn()
  public readonly id: string;
  @Column()
  public description: string;
  @OneToMany((type) => User, (user) => user.org_id)
  public user: User;
  @Column()
  public status: string;
  @CreateDateColumn()
  public created_at: Date;
  @CreateDateColumn()
  public updated_at: Date;

  constructor(props: Omit<Organization, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
