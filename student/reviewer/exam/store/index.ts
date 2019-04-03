import { name } from "./selectors";
import { examReducer } from "./reducers";

export const store = {
  name,
  examReducer: examReducer,
  config: {}
};
