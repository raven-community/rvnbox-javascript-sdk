export declare interface Asset {
    restURL: string;
    //constructor(restURL:string);
    details(asset: string): Promise<any>;
    list(): Promise<any>;
    addresses(asset: string): Promise<any>;
    balances(address: string): Promise<any>;
}

declare interface AssetDetails {
    name: string;
    amount: number;
    units: number;
    reissuable: boolean;
    has_ipfs: boolean;
    ipfs_hash: string;
}

declare interface AssetList {

}

declare interface AssetAddresses {

}

declare interface AssetBalances {

}
