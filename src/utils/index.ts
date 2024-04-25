import { store } from "@/store";
import { setBaseData } from "@/store/reducer";
import { UserInfo } from "@/types/user";

export const setBaseStore = (userInfo: UserInfo) => {
  store.dispatch(setBaseData(userInfo));
};
