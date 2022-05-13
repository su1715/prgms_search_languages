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
      const { searchResult, candidateIndex, selectedLanguages } = this.state;
      const newLanguage = searchResult[candidateIndex];

      alert(newLanguage);
      const filteredLanguages = selectedLanguages.filter(
        lang => lang !== newLanguage
      );
      const addedLanguages = [...filteredLanguages, newLanguage];
      const newSelectedLanguages = addedLanguages.slice(-5);

      this.setState({ ...this.state, selectedLanguages: newSelectedLanguages });
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
    },
    onItemMatch: item => {
      const { inputValue } = this.state;
      const startIndex = item.toLowerCase().indexOf(inputValue.toLowerCase());
      const endIndex = startIndex + inputValue.length;
      return (
        item.substring(0, startIndex) +
        `<span class="Suggestion__item--matched">` +
        item.substring(startIndex, endIndex) +
        `</span>` +
        item.substring(endIndex)
      );
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
