import mongoose, { Schema } from 'mongoose';
import { IPrivacy } from './privacy.interface';

// import { Schema } from 'zod';

const PrivacySchema: Schema<IPrivacy> = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Privacy = mongoose.model<IPrivacy>('Privacy', PrivacySchema);
export default Privacy;
