import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { IsLoggedInGuard } from 'src/is-logged-in/is-logged-in.guard';

@Controller('tasks')
//@UseGuards(IsLoggedInGuard) // to protect all the routes
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get() getTasks(@Query('reminder') reminder: 'true' | 'false') {
    // const service = new TasksService();
    return this.tasksService.getTasks(reminder);
  }

  @Get(':id') getOneTask(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.tasksService.getTask(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //@UseGuards(IsLoggedInGuard) here to protect a specific route
  @Post() @UseGuards(IsLoggedInGuard) createTask(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id') updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return this.tasksService.updateTask(+id, updateTaskDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id') deleteTask(@Param('id') id: string) {
    try {
      return this.tasksService.removeTask(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
