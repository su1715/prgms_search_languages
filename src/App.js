import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import request from "../util/api.js";
import SelectedLanguage from "./SelectedLanguage.js";
import { getItem, setItem } from "../util/localStorage.js";

const cache = { "": [] };

export default function App($app) {
  this.state = {
    inputValue: "",
    searchResult: [],
    selectedLanguages: [],
    candidateIndex: 0
  };

  const onSelectLanguage = index => {
    const { searchResult, selectedLanguages } = this.state;
    if (searchResult.length === 0) return;
    const newLanguage = searchResult[index];

    alert(newLanguage);
    const filteredLanguages = selectedLanguages.filter(
      lang => lang !== newLanguage
    );
    const addedLanguages = [...filteredLanguages, newLanguage];
    const newSelectedLanguages = addedLanguages.slice(-5);

    this.setState({ ...this.state, selectedLanguages: newSelectedLanguages });
  };

  const selectedLanguage = new SelectedLanguage({
    $app,
    initialState: this.state.selectedLanguages
  });

  const searchInput = new SearchInput({
    $app,
    initialState: this.state.inputValue,
    onChange: async value => {
      if (cache[value] === undefined) {
        const result = await request(`/languages?keyword=${value}`);
        cache[value] = result;
      }
      const newSearchResult = cache[value];
      this.setState({
        ...this.state,
        inputValue: value,
        searchResult: newSearchResult
      });
    },
    onEnterKey: () => {
      const { candidateIndex } = this.state;
      onSelectLanguage(candidateIndex);
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
    },
    onClick: index => {
      onSelectLanguage(index);
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
    setItem("APP_STATE", this.state);
  };

  this.init = () => {
    const initialState = getItem("APP_STATE", this.state);
    this.setState(initialState);
  };

  this.init();
}
