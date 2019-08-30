import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Movie } from '../movies/movies.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255 })
  @Index({ unique: true })
  email: string;
  @Column({ length: 255, select: false })
  password: string;
  @OneToMany(type => Movie, movie => movie.user)
  movies: Movie[];
}
