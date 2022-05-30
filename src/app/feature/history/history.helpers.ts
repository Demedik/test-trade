import { TradeType } from './history.constants';

export class HistoryItemHelpers {
  static calcProfit = (type: TradeType, startPrice: number, endPrice: number): number | null => {
    switch (type) {
      case TradeType.BUY:
        return endPrice - startPrice;
      case TradeType.SELL:
        return startPrice - endPrice;
      default:
        return null;
    }
  }
}
