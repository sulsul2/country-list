import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../style/style.css";
export {};

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  return (
    <div className="searchbar">
      <div className="search-input-container">
        {showSearchIcon && (
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setShowSearchIcon(false)}
          onBlur={() => setShowSearchIcon(true)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
