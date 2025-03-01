export interface IReceiptEmailParams {
    nightsCount: number,
    clientName: string,
    rate: number,
    totalCharge: number,
    fromDate: Date,
    toDate: Date,
    homeTitle: string,
    homeAddress: string,
    orderId: string,
    cardLast4Digits?: string,
    userEmail: string
}