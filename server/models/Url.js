import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    shortCode: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?`~-]+$/
    },
    password: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null }
});

export default mongoose.model('Url', UrlSchema);
