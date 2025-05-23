import mongoose, { Schema } from 'mongoose';
import { Iterms } from './terms.interface';

// import { Schema } from 'zod';

const TermsSchema: Schema<Iterms> = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Terms = mongoose.model<Iterms>('Terms', TermsSchema);
export default Terms;
