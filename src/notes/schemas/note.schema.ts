import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
  @ApiProperty({ description: 'The title of the note', example: 'My First Note' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'The content of the note', example: 'This is the content of my note' })
  @Prop({ required: true })
  content: string;

  @ApiProperty({ description: 'The unique identifier of the note', example: '507f1f77bcf86cd799439011' })
  _id?: string;

  @ApiProperty({ description: 'The date when the note was created' })
  createdAt?: Date;

  @ApiProperty({ description: 'The date when the note was last updated' })
  updatedAt?: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

