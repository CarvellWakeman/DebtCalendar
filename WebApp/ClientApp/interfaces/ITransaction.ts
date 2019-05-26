// Describes a transaction model used in rendering
export interface ITransaction {
    transactionType: string;
    amount: number;
    source: string;
    timeStamp: number;
    accountId: number;
}