import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';

import { selectOrderAction, removeSelectedOrderAction } from './../actions/index';
import { HistoryActions, addOrderAction, editOrderAction, removeOrderAction, clearOrdersAction } from '../actions';

import { IOrder } from './../../history.constants';

export interface HistoryState {
  selectedOrder: IOrder | null;
  balance: number;
  orders: Array<IOrder>;
}

const initiatialHistoryState: HistoryState = {
  selectedOrder: null,
  balance: 0,
  orders: [],
}

const addOrderReducer = (state: HistoryState, {type, order }): HistoryState => {
  return ({...state, orders: ([...state.orders, order] as Array<IOrder>).sort((a, b) =>  a.entryDate.getTime() - b.entryDate.getTime())})
};


interface editOrderReducerPayload {
  orderId: number;
  order: Partial<IOrder>;
}

const editOrderReducer = (state: HistoryState, action: editOrderReducerPayload): HistoryState => {
  const changedOrder = state.orders.find(item => item.orderId === action.orderId);
  const newOrdersList = new Array(...state.orders);
  newOrdersList.splice(newOrdersList.indexOf(changedOrder),1, {...changedOrder, ...action.order}).sort((a, b) =>  a.entryDate.getTime() - b.entryDate.getTime());
  return {...state, orders: newOrdersList };
}

const cleanOrdersReducer = (state: HistoryState): HistoryState => ({ ...state, orders: [] });


interface removeOrderReducerPayload {
  orderId: number;
}

const removeOrderReducer = (state: HistoryState, action: removeOrderReducerPayload): HistoryState => {
  const removedOrder = state.orders.find(item => item.orderId === action.orderId);
  const newOrdersList = new Array(...state.orders);
  newOrdersList.splice(newOrdersList.indexOf(removedOrder),1);
  return {...state, orders: newOrdersList };
}

interface selectOrderReducerPayload {
  orderId: number;
}


const selectOrderReducer = (state: HistoryState, action: selectOrderReducerPayload): HistoryState => {
  return {...state,  selectedOrder: state.orders.find(({ orderId })=> orderId === action.orderId) || null};
}

const removeSelectedOrderReducer = (state: HistoryState): HistoryState => ({ selectedOrder: null, ...state });

export const reducers = createReducer(initiatialHistoryState,
  on(addOrderAction, addOrderReducer),
  on(editOrderAction, editOrderReducer),
  on(removeOrderAction, removeOrderReducer),
  on(clearOrdersAction, cleanOrdersReducer),
  on(selectOrderAction, selectOrderReducer),
  on(removeSelectedOrderAction, removeSelectedOrderReducer),
);
