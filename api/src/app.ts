import express from 'express';
import session, { Store } from 'express-session';
import { SESSION_OPTONS } from './config';
import { active, catchAsync, internalServerError, notFoundError } from './middleware';
import { home, login, register } from './routes';

export const createApp = (store: Store) => {
    const app = express();

    app.use(express.json());

    app.use(
        session({
            ...SESSION_OPTONS,
            store
        })
    );

    app.use(catchAsync(active));

    app.use(home);

    app.use(login);

    app.use(register);

    app.use(notFoundError);

    app.use(internalServerError);

    return app;
};

