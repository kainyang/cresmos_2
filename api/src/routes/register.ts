import { Router } from 'express';
import { logIn } from '../auth';
import { BadRequest } from '../errors';
import { catchAsync, guest } from '../middleware';
import { User } from '../models';
import { registerSchema, validate } from '../validation'

const router = Router();

router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
        throw new BadRequest('Invalid email');
    }

    const user = await User.create({
        email, name, password
    });

    logIn(req, user.id);

    res.json({ messsage: 'OK' });
}));

export default router;