import {store} from "../store";
import {logoutUserSlice} from "../store/user";

export const logout = () => {
  store.dispatch(logoutUserSlice())
}
