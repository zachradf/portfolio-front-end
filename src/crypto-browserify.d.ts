declare module 'crypto-browserify' {
  import { Hash, Hmac } from 'crypto';

  export function createHash(algorithm: string): Hash;
  export function createHmac(algorithm: string, key: string | Buffer): Hmac;
}
