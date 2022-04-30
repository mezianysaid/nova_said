require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;
const Jwt_exp = process.env.JWT_EXP;
const DB_CONNECT = process.env.DB_CONNECTION;
const Code_admin = process.env.CODE_ADMIN;
module.exports = {
    JWT_Secret: jwt_secret,
    Jwt_Exp: Jwt_exp,
    DB_Connection: DB_CONNECT,
    Code_admin: Code_admin,
}