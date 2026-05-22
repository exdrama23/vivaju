import crypto from 'node:crypto';
import { SHA256_KEY } from './constants';

class CryptoUtils {

    static createSHA256Hash(rawValue: string){
        const hashedValue = crypto.createHmac('sha256', SHA256_KEY).update(rawValue).digest('hex');
        return hashedValue;
    }

    static compareHashes(incomingHash: string, trueHash: string){
        return crypto.timingSafeEqual(
            Buffer.from(incomingHash, 'hex'),
            Buffer.from(trueHash, 'hex')
        );
    }

    static compareRawWithHash(rawValue: string, trueHash: string){
        const incomingHash = this.createSHA256Hash(rawValue);
        const isValid = this.compareHashes(incomingHash, trueHash);
        return isValid;
    }

    static createHighEntropyString(){
        const highEntropyString = crypto.randomBytes(32).toString('hex');
        return highEntropyString;
    }

    static createSimpleBase64url(){
        const base64Url = crypto.randomBytes(16).toString('base64url'); 
        return base64Url;
    }

    static createUUID(){
        const uuid = crypto.randomUUID();
        return uuid;
    }

    /**
     * Gera um número inteiro aleatório entre min (inclusive) e max (exclusive).
     */
    static createRandomInt(min: number, max: number){
        const randomInt = crypto.randomInt(min, max);
        return randomInt;
    }

    static encrypt(text: string): string {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(SHA256_KEY, 'hex'), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }

    static decrypt(encryptedData: string): string {
        const [ivHex, authTagHex, encryptedText] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(SHA256_KEY, 'hex'), iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}

export default CryptoUtils;
