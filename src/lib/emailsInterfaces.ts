export interface IReceiptEmailParams {
    nightsCount: number,
    clientName: string,
    rate: number,
    totalCharge: number,
    fromDate: Date,
    toDate: Date,
    guests: number,
    homeTitle: string,
    homeAddress: string,
    orderId: string,
    reservationId: string,
    cardLast4Digits?: string,
    userEmail: string
}