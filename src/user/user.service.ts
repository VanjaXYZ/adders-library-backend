import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  // async createUser(createUserDto: CreateUserDto) {
  //   const user = await this.userModel.findOne({
  //     username: createUserDto.username,
  //   });

  //   if (user) {
  //     throw new HttpException(
  //       'Username already taken.',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   const createdUser = new this.userModel(createUserDto);
  //   return await createdUser.save();
  // }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
