import { createSelector } from "@ngrx/store";

import { HistoryState } from './../reducers/index';

import { IOrder } from './../../history.constants';

export const selectFeature = (state: {HistoryFeature: HistoryState}) =>  state.HistoryFeature;
export const selectOrders = createSelector(selectFeature,(state: HistoryState) => state.orders);
export const selectSelectedOrder= createSelector(selectFeature,(state: HistoryState) => state.selectedOrder);

export const selectOrdersForChart = createSelector(selectFeature, ({balance, orders}) => {
  let currentBalance = balance;
  return orders.map(({profit}) => {
    currentBalance += profit;
    return currentBalance;
  })
});
