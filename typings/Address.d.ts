export declare interface Address {
    restURL: string;
    //constructor(restURL: string);
    toLegacyAddress(address: string): string;
    // toRvn2Address(address: string, prefix?: boolean, regtest?: boolean): string;
    toHash160(address: string): string;
    hash160ToLegacy(hash160: string, network?: number): string;
    hash160ToCash(hash160: string, network?: number, regtest?: boolean): string;
    isLegacyAddress(address: string): boolean;
    // isRvn2Address(address: string): boolean;
    isMainnetAddress(address: string): boolean;
    isTestnetAddress(address: string): boolean;
    isRegTestAddress(address: string): boolean;
    isP2PKHAddress(address: string): boolean;
    isP2SHAddress(address: string): boolean;
    detectAddressFormat(address: string): string;
    detectAddressNetwork(address: string): string;
    detectAddressType(address: string): string;
    fromXPub(xpub: string, path?: string): string;
    fromOutputScript(scriptPubKey:string, network?: string): string;
    details(address: string[]): Promise<AddressDetailsResult[]>;
    utxo(address: string[]): Promise<AddressUtxoResult[][]>;
    unconfirmed(address: string[]): Promise<AddressUnconfirmedResult[][]>;
}

export declare interface AddressDetailsResult {
    balance: number;
    balanceCorb: number;
    totalReceived: number;
    totalReceivedCorb: number;
    totalSent: number;
    totalSentCorb: number;
    unconfirmedBalance: number;
    unconfirmedBalanceCorb: number;
    unconfirmedTxApperances: number;
    txApperances: number;
    transactions: string[];
    legacyAddress: string;
    // rvn2Address: string;
}

export declare interface AddressUtxoResult {
    txid: string;
    vout: number;
    scriptPubKey: string;
    amount: number;
    corbes: number;
    height: number;
    confirmations: number;
    legacyAddress: string;
    // rvn2Address: string;
}

export declare interface AddressUnconfirmedResult {
    txid: string;
    vout: number;
    scriptPubKey: string;
    amount: number;
    corbes: number;
    confirmations: number;
    ts: number;
    legacyAddress: string;
    // rvn2Address: string;
}
