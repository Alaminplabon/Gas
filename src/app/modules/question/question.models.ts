import mongoose, { Schema, model } from 'mongoose';
import { IQuestion } from './question.interface';

const questionSchema = new Schema<IQuestion>(
  {
    text: { type: String, required: true },
    answerType: { type: String, required: true },
    comment: { type: String },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    driverId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Question = model<IQuestion>('Question', questionSchema);
export default Question;
