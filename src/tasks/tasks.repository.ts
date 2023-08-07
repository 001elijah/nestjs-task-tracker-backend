import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findOne(taskFilterQuery: FilterQuery<Task>): Promise<Task> {
    return this.taskModel.findOne(taskFilterQuery);
  }

  async find(tasksFilterQuery: FilterQuery<Task>): Promise<Task[]> {
    return this.taskModel.find(tasksFilterQuery);
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async findOneAndUpdate(
    taskFilterQuery: FilterQuery<Task>,
    task: Partial<Task>,
  ): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(taskFilterQuery, task);
  }
}
