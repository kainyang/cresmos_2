import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";

const THIRTY_MINUTES = 1000 * 60 * 30;

const ONE_HOUR = THIRTY_MINUTES * 2;

const SIX_HOURS = ONE_HOUR * 6;

const { env } = process;

export const {
    SESSION_SECRET = `this is the session secret.`,
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = SIX_HOURS,
} = env;

export const SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS);

export const SESSION_OPTONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
};