import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        let formattedUrl = originalUrl;

        if (!/^https?:\/\//i.test(originalUrl)) {
            formattedUrl = 'http://' + originalUrl;
        }

        const shortCode = nanoid(8);
        const shortUrl = `localhost:6061/${shortCode}`;

        const url = new Url({
            originalUrl: formattedUrl,
            shortUrl,
            shortCode,
            createdAt: new Date(),
        });
        await url.save();

        res.json({ shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}

export const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (url) {
            const currentDate = new Date();
            if (url.expiresAt && url.expiresAt < currentDate) {
                return res.status(410).json('URL has expired');
            }
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('URL not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}

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
        url.shortUrl = `localhost:6061/${newShortCode}`;

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

export const editExpiration = async (req, res) => {
    const { shortCode } = req.params;
    const { days } = req.body;
    console.log(typeof (days))

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: 'Không tìm thấy URL rút gọn' });
        }

        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + parseInt(days));

        url.expiresAt = newExpiresAt;

        await url.save();

        res.json({
            message: 'Cập nhật thời gian hết hạn thành công',
            shortUrl: url.shortUrl,
            expiresAt: url.expiresAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
};
