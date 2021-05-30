import React from "react";
import "./style.css";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  value?: string;
}

export const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  (props, ref) => {
    const { placeholder, onChange, className, value } = props;

    return (
      <form
        ref={ref}
        onSubmit={(event) => event.preventDefault()}
        className={className}
      >
        <input
          className="searchbar"
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          value={value}
        />
      </form>
    );
  }
);
