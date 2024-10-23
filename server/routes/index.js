import { Router } from 'express';
import { editExpiration, editShortUrl, redirectUrl, shortenUrl, verify } from '../controllers/urlController.js';
import { registerUser } from '../controllers/authController.js';
import { loginUser } from '../controllers/authController.js';
// import { authenticateUser } from '../../middleware/authenticateUser.js';

const router = Router();

router.post('/shorten', shortenUrl);
router.get('/:shortCode', redirectUrl);
router.post('/verify/:shortCode', verify)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/edit/:shortCode', editShortUrl);
router.put('/expiration/:shortCode', editExpiration)

export default router;
