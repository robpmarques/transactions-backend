import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Category;
