//components/SearchBox/SearchBox.tsx

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      id="Search"
      name="Search"
      type="text"
      placeholder="Search"
      value={value}
      onChange={handleChange}
    />
  );
}
