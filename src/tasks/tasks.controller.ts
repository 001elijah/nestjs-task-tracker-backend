import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  @Get() getTasks() {
    return [];
  }

  @Get(':id') getOneTask(@Param('id') id: string) {
    console.log('get');
    return { id };
  }

  @Post() createTask(@Body() createTaskDto: CreateTaskDto) {
    return {
      id: createTaskDto.id,
      text: createTaskDto.text,
      day: createTaskDto.day,
      reminder: createTaskDto.reminder,
    };
  }

  @Put(':id') updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return {
      id,
      text: updateTaskDto.text,
      day: updateTaskDto.day,
      reminder: updateTaskDto.reminder,
    };
  }
  @Delete(':id') deleteTask(@Param('id') id: string) {
    return { id };
  }
}
