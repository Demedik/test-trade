import { createAction, props } from '@ngrx/store';

import { IOrder } from './../../history.constants';

export enum HistoryActions {
  ADD_ORDER = 'ADD_ORDER',
  EDIT_ORDER = 'EDIT_ORDER',
  REMOVE_ORDER = 'REMOVE_ORDER',
  CLEAR_ORDERS = 'CLEAR_ORDERS',
  SELECT_ORDER = 'SELECT_ORDER',
  REMOVE_SELECTED_ORDER = 'REMOVE_SELECTED_ORDER',
}

export const addOrderAction = createAction(HistoryActions.ADD_ORDER, props<{ order: IOrder }>());
export const editOrderAction = createAction(HistoryActions.EDIT_ORDER, props<{ orderId: number; order: Partial<IOrder>; }>());
export const removeOrderAction = createAction(HistoryActions.REMOVE_ORDER, props<{ orderId: number }>());
export const clearOrdersAction = createAction(HistoryActions.CLEAR_ORDERS);
export const selectOrderAction = createAction(HistoryActions.SELECT_ORDER, props<{ orderId: number; }>());
export const removeSelectedOrderAction = createAction(HistoryActions.REMOVE_SELECTED_ORDER);
