import { configureStore, Store } from "@reduxjs/toolkit";
import {
  GoodsState,
  goodsSlice,
  GoodsAction,
  BaseState,
  baseSlice,
  UsersAction,
} from "./reducer/index";

interface StoreState {
  goods: GoodsState;
  base: BaseState;
}

/**
 * store action 类型
 */
export type StoreActions = keyof GoodsAction | keyof UsersAction;

/**
 * store action 类型对应的payload
 */
export type StoreActionPayloads<T extends StoreActions> = (GoodsAction &
  UsersAction)[T];

export type StoreDispatch<T extends StoreActions> = {
  type: T;
  payload: StoreActionPayloads<T>;
};

// 创建store
export const store: Store<
  StoreState,
  StoreDispatch<StoreActions>
> = configureStore({
  reducer: {
    goods: goodsSlice.reducer,
    base: baseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
