import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({
    description: 'Note data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My First Note' },
        content: { type: 'string', example: 'This is the content of my note' }
      },
      required: ['title', 'content']
    }
  })
  @ApiResponse({ status: 201, description: 'Note created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createNoteDto: { title: string; content: string }): Promise<Note> {
    return this.notesService.create(createNoteDto.title, createNoteDto.content);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({ status: 200, description: 'List of all notes' })
  async findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiParam({ name: 'id', description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Note found' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async findOne(@Param('id') id: string): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiParam({ name: 'id', description: 'Note ID' })
  @ApiBody({
    description: 'Updated note data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Note Title' },
        content: { type: 'string', example: 'Updated note content' }
      },
      required: ['title', 'content']
    }
  })
  @ApiResponse({ status: 200, description: 'Note updated successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async update(@Param('id') id: string, @Body() updateNoteDto: { title: string; content: string }): Promise<Note> {
    return this.notesService.update(id, updateNoteDto.title, updateNoteDto.content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiParam({ name: 'id', description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Note deleted successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async remove(@Param('id') id: string): Promise<Note> {
    return this.notesService.remove(id);
  }
}
