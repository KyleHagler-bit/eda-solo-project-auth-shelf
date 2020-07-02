import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//saga to GET items from database
function* fetchShelf() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/shelf", config);
    yield put({ type: "SET_SHELF", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

//saga to POST new item to database
function* addShelf(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    //with POST, does not need response
    yield axios.post("/api/shelf", action.payload, config);
    yield put({ type: "FETCH_SHELF" });
  } catch (error) {
    console.log("Error with adding item to shelf:", error);
  }
}

function* shelfSaga() {
  yield takeLatest("FETCH_SHELF", fetchShelf);
  yield takeLatest("ADD_SHELF_ITEM", addShelf);
}

export default shelfSaga;
