import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from '../schemas/books.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books.name) private bookModel: Model<Books>) {}

  async createBook(createBookDto: CreateBookDto) {
    const newBook = new this.bookModel(createBookDto);
    const savedBook = await newBook.save();
    return savedBook;
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  remove(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
