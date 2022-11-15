import { createStore, applyMiddleware } from "redux";
import { Constants } from "expo";
import { composeWithDevTools } from "remote-redux-devtools";
import reducer from "./reducer";

const ipMatch = Constants.manifest.hostUri.match(/([0-9.]+):/)[1]

export default createStore(
  reducer,
  applyMiddleware(
    composeWithDevTools({
      hostname: `${ipMatch ? ipMatch[1] : 'localhost'}:5678`
    })
  )
);
