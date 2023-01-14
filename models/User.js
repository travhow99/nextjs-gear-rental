import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Date, default: null },
    image: { type: String, default: null },
    role: { type: String, default: 'user' },
    seller: { type: Boolean, default: false },
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

const User = mongoose?.models['User'] || mongoose.model('User', userSchema);
export default User;
