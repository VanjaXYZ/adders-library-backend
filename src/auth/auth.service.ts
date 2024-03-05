import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const findUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (findUser) {
      throw new HttpException(
        'Username already taken.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    return savedUser;
  }

  async login(loginUser: CreateAuthDto): Promise<{ access_token: string }> {
    const { username, password } = loginUser;

    const user = await this.userModel.findOne({
      username: username,
    });

    if (!user) {
      throw new BadRequestException(username, 'Wrong username credentials!');
    }
    const isPasswordOK = await this.userModel.findOne({
      password: password,
    });

    if (!isPasswordOK) {
      throw new BadRequestException(password, 'Wrong password credentials!');
    }

    const payload = { sub: user._id, username: user.username };
    console.log(payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
