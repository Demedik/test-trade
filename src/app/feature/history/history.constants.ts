
export enum TradeType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface IOrder {
  orderId: number;
  orderType: TradeType;
  entryDate: Date;
  exitDate: Date;
  entryPrice: number;
  exitPrice: number;
  profit: number;
}
