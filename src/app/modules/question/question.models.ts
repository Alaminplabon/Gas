import mongoose, { Schema, model } from 'mongoose';
import { IQuestion } from './question.interface';

const questionSchema = new Schema<IQuestion>(
  {
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Question = model<IQuestion>('Question', questionSchema);
export default Question;
