export default function SearchInput({ $app, initialState, onChange }) {
  this.state = initialState;
  this.$target = document.createElement("form");
  this.$target.class = "SearchInput";
  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." autofocus>`;
    const $input = document.querySelector(".SearchInput__input");
    $input.value = this.state;
    $input.focus();
  };

  this.render();

  this.$target.addEventListener("keyup", e => {
    onChange(e.target.value);
  });
}
