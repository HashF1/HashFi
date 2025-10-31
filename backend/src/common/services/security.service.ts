import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
var jwt = require('jsonwebtoken');

@Injectable()
export class SecurityService {
    saltRounds = Number(process.env.HASH_SALT);
    async encrypt(data: string) {
        const hash = await bcrypt.hash(data, this.saltRounds);
        return hash;
    }

    generateOtp2(secret: string, email: string) {
        const otp: any = speakeasy.totp({
                secret: secret + email,
                encoding: 'base32',
                step: 600,
                digits: 6,
        });
        return otp;
    }

    generateAdminOtp(secret: string, email: string) {
        const otp: any = speakeasy.totp({
                secret: secret + email,
                encoding: 'base32',
                step: 600,
                digits: 6,
        });
        return otp;
    }


    generateUserId(secret: string, email: string) {
        const otp: any = speakeasy.totp({
                secret: secret + email,
                encoding: 'base32',
                step: 600,
                digits: 8,
        });
        return otp;
    }

    generateRandomString(length) {
        const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }

    async extractUserFromToken(token) {
        const decoded = jwt.verify(token, process.env.DEFAULT_SECRET);
        return decoded;
    }

    extractTokenFromHeader(request) {
        let token = request.headers.authorization.substring(
                7,
                request.headers.authorization.length
        );
        return token;
    }

    async getLoggedInUser(request) {
        let token = await this.extractTokenFromHeader(request);
        const decoded = jwt.verify(token, process.env.DEFAULT_SECRET);
        return decoded;
    }

    async generateToken(data: any) {
        const token = jwt.sign(
                { data: data }, 
                process.env.DEFAULT_SECRET, 
                { expiresIn: '7d' }
        );
        return token;
    }
}
