import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    BaseEntity,
  } from 'typeorm';
  
  @Entity('genres')
  export class Genre extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100, nullable: false })
    @Index({ unique: true })
    name: string;
    @Column({ length: 255 })
    description: string;
  }
  