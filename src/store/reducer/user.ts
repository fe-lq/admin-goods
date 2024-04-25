import { ExtractActionType } from "@/types/store";
import { UserInfo } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BaseState {
  /**
   * 用户信息
   */
  userInfo: Partial<UserInfo>;
}

const initialState: BaseState = {
  userInfo: {},
};

/**
 * 基座传递的数据
 */
export const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setBaseData: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setBaseData } = baseSlice.actions;
export type UsersAction = ExtractActionType<typeof baseSlice.actions>;
