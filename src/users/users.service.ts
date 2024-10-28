import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<User>): Promise<User> {
        try {
            const existingUser = await this.usersRepository.findOne({ where: { email: userData.email } });
            console.log(existingUser)
            if (existingUser) {
                throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
            }
            const user = this.usersRepository.create(userData);
            return this.usersRepository.save(user);
           } catch (error) {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    async update(email:string, updateItemDto: any): Promise<any> {
        const item = await  this.usersRepository.findOne({ where: { email } });
        Object.assign(item, updateItemDto);
        return this.usersRepository.save(item);
    }

}
