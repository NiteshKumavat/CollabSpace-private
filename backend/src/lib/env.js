import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    DATABASE_URI : process.env.DATABASE_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    NODE_ENV : process.env.NODE_ENV,
}