import mongoose from 'mongoose'

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    shortCode: { type: String, required: true },
    password: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000), index: { expires: '7d' } }
});

export default mongoose.model('Url', UrlSchema);
