import { Router } from 'express';
import { logIn, logOut } from '../auth';
import { Unauthorized } from '../errors';
import { auth, catchAsync, guest } from '../middleware';
import { User } from '../models';
import { loginSchema, validate } from '../validation';

const router = Router();

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
        throw new Unauthorized('Incorrect email or password');
    }

    logIn(req, user.id);
    
    res.json({ message: 'OK'});
}));

router.post('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res);

    res.json({ message: 'OK' });
}));

export default router;