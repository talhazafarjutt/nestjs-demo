import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(title: string, content: string): Promise<Note> {
    const note = new this.noteModel({ title, content });
    return note.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, title: string, content: string): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, { title, content }, { new: true }).exec();
  }

  async remove(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
