import React from "react";
import store, { ADD_ROW, pickColor, fillColor } from "../store";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    // this.state.grid is an array
    // the first line in the table = this.state.grid[0]
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleColorChange(event) {
    pickColor(event.target.value);
  }

  handleColorFill(event) {
    let squareIdx = event.target.id;
    let rowIdx = event.target.parentNode.id;
    fillColor(rowIdx, squareIdx);
  }

  render() {
    return (
      <div id="pixelate">
        <h1>Pixelate</h1>
        <div>
          <button id="add-row" onClick={ADD_ROW}>
            Add a row
          </button>
          <select onChange={this.handleColorChange}>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
          </select>
        </div>
        <table>
          <tbody>
            {this.state.grid.map((row, idx) => (
              // creates a row for every element in the grid array
              <tr key={idx} id={idx}>
                {row.map((square, idx) => (
                  // creates a td for every element in that nested array
                  // class name with the string representing the color
                  <td
                    className={square}
                    key={idx}
                    id={idx}
                    onClick={this.handleColorFill}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
