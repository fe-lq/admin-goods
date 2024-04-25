import {
  RootState,
  AppDispatch,
  StoreActions,
  StoreDispatch,
  StoreActionPayloads,
} from "@/store";
import { createSelector, Selector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/**
 *
 * @param dispatch
 * @returns 重新定义dispatch接收的参数，使类型更严格
 */
export const useCreateAction =
  (dispatch: AppDispatch) =>
  <T extends StoreActions>(data: {
    type: T;
    payload: StoreActionPayloads<T>;
  }): StoreDispatch<T> => {
    return dispatch({ type: data.type, payload: data.payload });
  };

export const useAppDispatch = () => {
  const dispatch = useDispatch();
  return useCreateAction(dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * 有memoized的Selector
 */
export const useComputedSelector = <T, R>(
  selectorFn: (state: RootState) => R,
  resultFn: (data: R) => T,
) => {
  const selector: Selector<RootState, T> = createSelector(selectorFn, resultFn);
  return useSelector(selector);
};
