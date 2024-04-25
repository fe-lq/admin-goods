import { Category } from "@/types/category";
import { ExtractActionType } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GoodsState {
  /**
   * 商品分类数据
   * 不去除children， createSlice会有一个类型报错提示
   */
  categoryList: Omit<Category, "children">[];
}

const initialState: GoodsState = {
  categoryList: [],
};

/**
 * 商品数据
 */
export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setTypeList: (state, action: PayloadAction<Category[]>) => {
      state.categoryList = action.payload;
    },
  },
});

export const { setTypeList } = goodsSlice.actions;
export type GoodsAction = ExtractActionType<typeof goodsSlice.actions>;
