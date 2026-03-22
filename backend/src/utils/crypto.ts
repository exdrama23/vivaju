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

    static createFriendlyToken(size: number = 30){
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

        let token = '';

        const charactersLength = characters.length;

        for (let i = 0; i < size; i++) {
            token += characters[this.createRandomInt(0, charactersLength)];
        }
        return token;
    }

}

export default CryptoUtils;