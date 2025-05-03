import { model, Schema } from 'mongoose';
import { ISubscriptions, ISubscriptionsModel } from './subscription.interface';
import { durationType } from './subscription.constants';

// Define the Mongoose schema
const SubscriptionsSchema = new Schema<ISubscriptions>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    durationType: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    trnId: { type: String, default: null },
    amount: { type: Number, required: true, min: 0 },
    expiredAt: { type: Date, default: null },
    isExpired: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

SubscriptionsSchema.pre('find', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

SubscriptionsSchema.pre('findOne', function (next) {
  //@ts-ignore
  this.find({ isDeleted: { $ne: true } });
  next();
});

SubscriptionsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create and export the model
const Subscription = model<ISubscriptions, ISubscriptionsModel>(
  'Subscriptions',
  SubscriptionsSchema,
);

export default Subscription;
