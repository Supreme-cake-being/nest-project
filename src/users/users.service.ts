import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) return null;

    const user = this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);

    console.log('prev user', user, attributes);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attributes);

    console.log('new user', user);

    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}
