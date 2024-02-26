import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Books {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  author: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
