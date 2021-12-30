import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Date, default: null },
    image: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */

/**
 * Statics
 */

const User = mongoose.models['User'] || mongoose.model('User', userSchema);
export default User;
