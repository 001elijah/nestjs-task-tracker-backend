import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'May 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'May 6th at 2:30pm',
      reminder: false,
    },
    {
      text: 'Go to gym',
      day: '04.08 18:30',
      reminder: true,
      id: 3,
    },
  ];

  getTasks(reminder: string) {
    if (reminder === 'true' || reminder === 'false') {
      return this.tasks.filter((task) => task.reminder.toString() === reminder);
    } else {
      return this.tasks;
    }
  }

  getTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('task not found');
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      id: Date.now(),
    };
    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updateTaskDto };
      }
      return task;
    });
    return this.getTask(id);
  }

  removeTask(id: number) {
    const toBeRemoved = this.getTask(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return toBeRemoved;
  }
}
