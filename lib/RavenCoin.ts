export declare interface RavenCoin {
	toSatoshi(coins: number): number;
	toRavencoin(satoshi: number): number;
	toBits(satoshi: number): number;
	satoshiToBits(satoshi: number): number;
	signMessageWithPrivKey(privateKeyWIF: string, message: string): string;
	verifyMessage(address : string, signature: string, message: string): Boolean;
	encodeBase58Check(hex: string): string;
	decodeBase58Check(address: string): string;
	encodeBIP21(address: string, options: EncodeBIP21Options, regtest?: boolean): string;
	decodeBIP21(url: string): BIP21Object;
	getByteCount(inputs: ByteCountInput|object, outputs: ByteCountOutput): number;
	encryptBIP38(privKeyWIF: string, passphrase: string): string;
	decryptBIP38(encryptedKey: string, passphrase: string, network?: string): string;
}

declare interface EncodeBIP21Options {
	amount?: number;
	label?: string;
	message?: string;
}

declare interface BIP21Object {
	address: string;
	options?: EncodeBIP21Options
}

declare interface ByteCountInput {
	P2PKH?: number;
}

declare interface ByteCountOutput {
	P2PKH?: number;
	P2SH?: number;
}
