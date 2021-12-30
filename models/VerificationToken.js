import mongoose from 'mongoose';

const verificationTokenSchema = new mongoose.Schema(
  {
    token: { type: String },
    expires: { type: Date },
    identifier: { type: Date },
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

const VerificationToken =
  mongoose.models['VerificationToken'] ||
  mongoose.model('VerificationToken', verificationTokenSchema);
export default VerificationToken;
