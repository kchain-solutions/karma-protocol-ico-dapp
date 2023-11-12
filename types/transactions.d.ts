export interface TransactionResponse  {
    available_gldkrm_amount: string,
    txs: Tx[],
    is_cached: boolean
};

export interface Tx {
    type: string,
    stable_amount: string,
    gldkrm_amount: string,
    tx_hash: string,
    beneficiary: string,
    date: string
}