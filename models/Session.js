import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    expires: { type: Date, required: true },
    sessionToken: { type: String, required: true },
    sessionId: { type: Date },
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

const Session =
  mongoose?.models['Session'] || mongoose.model('Session', sessionSchema);
export default Session;
