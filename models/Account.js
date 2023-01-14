import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String, default: null },
    expires_at: { type: Number, default: null },
    token_type: { type: String, default: null },
    scope: { type: String },
    id_token: { type: String },
    userId: { type: String, required: true },
    oauth_token_secret: { type: String },
    oauth_token: { type: String },
    session_state: { type: String },
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

const Account =
  mongoose?.models['Account'] || mongoose.model('Account', accountSchema);
export default Account;
