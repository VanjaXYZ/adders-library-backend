import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
