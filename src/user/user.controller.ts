import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   console.log(createUserDto);
  //   const user = await this.userService.register(createUserDto);
  //   return user;
  // }
  // @Post('/register')
  // @UsePipes(new ValidationPipe())
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   console.log(createUserDto);
  //   const user = await this.userService.createUser(createUserDto);
  //   return user;
  // }

  @Get()
  findAll() {
    return this.userService.findAll().populate('password');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
