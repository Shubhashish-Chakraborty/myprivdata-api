import './oauth/passport';
import passport from 'passport';
import express from 'express';
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routes/userRoutes';
import { OauthRouter } from './oauth/main';
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        },
    })
);

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: [
        'http://localhost:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/api/v1/auth/user", UserRouter);
app.use("/auth", OauthRouter);


app.get("/", (req, res) => {
    res.send(`
        <h1 style="text-align: center;">MyPrivData's Server is up and running!!</h1>
    `)
})

app.listen(PORT, () => {
    console.log(`BACKEND IS HOSTED : http://localhost:${PORT}`)
});