import { useState, FC, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) {
      toast.error("Please enter a valid search term.", { duration: 2500 });
      return;
    }
    handleSearch(query);
    setInputValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header className={s.header}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
