import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
    const { originalUrl, password } = req.body;

    try {
        let formattedUrl = originalUrl;
        if (!/^https?:\/\//i.test(originalUrl)) {
            formattedUrl = 'http://' + originalUrl;
        }

        const shortCode = nanoid(6);
        const shortUrl = `https://url-shortener-s4ws.onrender.com/${shortCode}`;

        const url = new Url({
            originalUrl: formattedUrl,
            shortUrl,
            shortCode,
            password: password || null,
            createdAt: new Date(),
            expiresAt: null
        });

        await url.save();
        res.status(200).json({ shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
};


export const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json('URL not found');
        }

        const currentDate = new Date();
        if (url?.expiresAt && url?.expiresAt < currentDate) {
            return res.status(410).json('URL has expired');
        }

        if (url?.password) {
            return res.redirect(`https://url-shortener-omega-one.vercel.app/verify/${shortCode}`);
        }

        return res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
};



export const editShortUrl = async (req, res) => {
    const { shortCode } = req.params;
    const { newShortCode } = req.body;

    try {
        const existingUrl = await Url.findOne({ shortCode: newShortCode });

        if (existingUrl) {
            return res.status(400).json({ message: 'ShortCode already exists. Choose another one.' });
        }

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        url.shortCode = newShortCode;
        url.shortUrl = `https://url-shortener-s4ws.onrender.com/${newShortCode}`;

        await url.save();

        res.json({
            message: 'Short URL updated successfully',
            shortUrl: url.shortUrl,
            originalUrl: url.originalUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verify = async (req, res) => {
    const { shortCode } = req.params;
    const { password } = req.body;
    try {
        const url = await Url.findOne({ shortCode });

        if (!url || password !== url?.password) {
            return res.status(403).json('Incorrect password');
        }
        return res.status(200).json({ originalUrl: url.originalUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}

export const editExpiration = async (req, res) => {
    const { shortCode } = req.params;
    const { days } = req.body;
    console.log(typeof (days))

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + parseInt(days));

        url.expiresAt = newExpiresAt;

        await url.save();

        res.json({
            message: 'Updated expiry day successfully',
            shortUrl: url.shortUrl,
            expiresAt: url.expiresAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
