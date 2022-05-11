import SearchInput from "./SearchInput.js";

export default function App($app) {
  this.state = { inputValue: "" };

  const searchInput = new SearchInput({
    $app,
    initialState: this.state.inputValue,
    onChange: value => {
      this.setState({ ...this.state, inputValue: value });
    }
  });

  this.setState = nextState => {
    this.state = nextState;
    searchInput.setState(this.state.inputValue);
  };

  this.init = () => {};
}
