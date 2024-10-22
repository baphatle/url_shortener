import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        const shortCode = nanoid(8);

        const shortUrl = `localhost:6061/api/${shortCode}`;

        // Lưu thông tin vào database
        const url = new Url({
            originalUrl,
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
        console.log("URL", url.originalUrl)

        if (url) {
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
    const { days } = req.body; // Nhận số ngày từ client

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: 'Không tìm thấy URL rút gọn' });
        }

        // Tính toán ngày hết hạn mới
        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + days); // Thêm số ngày vào ngày hiện tại

        // Cập nhật thời gian hết hạn
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
