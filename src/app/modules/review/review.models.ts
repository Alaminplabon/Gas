import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema: Schema<IReview> = new Schema(
  {
    driverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Driver', // Replace with actual model name
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Replace with actual user model if needed
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<IReview>('Review', reviewSchema);
