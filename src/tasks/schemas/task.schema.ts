import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  text: string;
  @Prop({ required: true })
  day: string;
  @Prop({ required: true })
  reminder: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
