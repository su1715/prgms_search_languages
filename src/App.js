import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import request from "../util/api.js";
import SelectedLanguage from "./SelectedLanguage.js";

export default function App($app) {
  this.state = {
    inputValue: "",
    searchResult: [],
    selectedLanguages: [],
    candidateIndex: 0
  };

  const selectedLanguage = new SelectedLanguage({
    $app,
    initialState: this.state.selectedLanguages
  });

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
    },
    onEnterKey: () => {
      const { searchResult, candidateIndex } = this.state;
      console.log(searchResult, candidateIndex);
      alert(searchResult[candidateIndex]);
    }
  });

  const suggestion = new Suggestion({
    $app,
    initialState: {
      searchResult: this.state.searchResult,
      candidateIndex: this.state.candidateIndex
    },
    onArrowKey: key => {
      const {
        searchResult: { length: len },
        candidateIndex
      } = this.state;
      let newIndex = candidateIndex;
      if (key === "ArrowUp") {
        newIndex = (candidateIndex + len - 1) % len;
      } else if (key === "ArrowDown") {
        newIndex = (candidateIndex + 1) % len;
      }
      this.setState({
        ...this.state,
        candidateIndex: newIndex
      });
    }
  });

  this.setState = nextState => {
    this.state = nextState;
    searchInput.setState(this.state.inputValue);
    suggestion.setState({
      searchResult: this.state.searchResult,
      candidateIndex: this.state.candidateIndex
    });
    selectedLanguage.setState(this.state.selectedLanguages);
  };

  this.init = () => {};
}
