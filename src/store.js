// We'll dive deeper into middleware later.
// For now, it's enough to know that this loggerMiddleware prints out useful
// information about everything that happens in your store.
// Much like requests in express pass from middleware to middleware, actions in redux
// pass from middleware to middleware. The loggerMiddleware gets a chance to see
// actions before they are processed. They get in the middle, hence, middleware.
import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";

// We'll soon revisit the initial state of this application.
const initialState = {
  grid: [Array(20).fill("")],
  color: "red",
};

// ACTION TYPES
/* we'll add some action types soon */

// ACTION CREATORS
/* we'll also add the corresponding action creators */

// And we'll revisit this reducer.
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADDROW:
      const numCols = state.grid[0].length;
      const newRow = Array(numCols).fill("");
      // by using the spread operator, we return a *new* object, not a mutated one
      return { ...state, grid: [...state.grid, newRow] };
    case PICK_COLOR:
      return { ...state, color: action.colorChoice };
    case FILL_COLOR:
      const newGrid = [...state.grid];
      newGrid[action.rowIdx] = [...newGrid[action.rowIdx]];
      newGrid[action.rowIdx][action.squareIdx] = state.color;
      return { ...state, grid: newGrid };
    default:
      return state;
  }
}

// grid[rowIdx][squareIdx] = color

const ADDROW = "ADDROW";
export const ADD_ROW = () => store.dispatch({ type: ADDROW });

const PICK_COLOR = "PICK_COLOR";
export const pickColor = (color) => {
  store.dispatch({ type: PICK_COLOR, colorChoice: color });
};

const FILL_COLOR = "FILL_COLOR";
export const fillColor = (rowIdx, squareIdx) => {
  store.dispatch({ type: FILL_COLOR, rowIdx, squareIdx });
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;

// [
// ["", "red", "", "", "", ""],
// ["", "", "", "", "", ""],
// ["", "", "", "", "", ""]
// ]

// Array(5) creates an array of length 5
