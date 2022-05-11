import SearchInput from "./SearchInput.js";
import request from "../util/api.js";

export default function App($app) {
  this.state = { inputValue: "", searchResult: [] };

  const searchInput = new SearchInput({
    $app,
    initialState: this.state.inputValue,
    onChange: async value => {
      let result = [];
      if (value !== "") {
        result = await request(`/languages?keyword=${value}`);
        console.log(result);
      }
      this.setState({ ...this.state, inputValue: value, searchResult: result });
    }
  });

  this.setState = nextState => {
    this.state = nextState;
    searchInput.setState(this.state.inputValue);
  };

  this.init = () => {};
}
