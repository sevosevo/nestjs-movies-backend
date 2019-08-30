import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Genre } from './genres.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  @Index({ unique: true })
  name: string;
  @Column({ type: 'text' })
  @Index({ fulltext: true })
  description: string;
  @ManyToOne(type => User, user => user.movies)
  user: User;
  @ManyToMany(type => Genre)
  @JoinTable()
  genres: Genre[];
}
