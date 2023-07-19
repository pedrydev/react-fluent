export default class CryptoService {
  static base64UrlEncode(buffer: ArrayBuffer) {
    const str = String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer)));
    const base64 = btoa(str);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }

  static generateCodeVerifier() {
    const array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ("0" + dec.toString(16)).substring(-2)).join("");
  }

  static generateRandomNumber() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }

  static sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }
}
