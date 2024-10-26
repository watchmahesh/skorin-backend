import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @BeforeInsert()
  async hashPassword() {
    console.log('Hashing password:', this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Hashed password:', this.password); // Should output the hashed password
  }
  async validatePassword(password: string): Promise<boolean> {
    console.log(password, this.password, await bcrypt.compareSync(password, this.password))
    return await bcrypt.compareSync(password, this.password);
  }
}
