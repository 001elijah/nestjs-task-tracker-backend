import { MinLength } from 'class-validator';

export class CreateTaskDto {
  id: number;
  @MinLength(3)
  text: string;
  day: string;
  reminder: boolean;
}
