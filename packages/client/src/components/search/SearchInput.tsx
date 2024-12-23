import type { ChangeEvent } from "react";

export function SearchInput({
  value,
  showClearButton,
  onSearch,
  onClear,
}: {
  value: string;
  showClearButton: boolean;
  onSearch: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="form">
      <i className="fa fa-search"></i>
      <input
        type="text"
        className="form-control form-input"
        placeholder="Search accommodation..."
        data-testid="search-accomodation"
        autoFocus
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onSearch(event.target.value)
        }
      />
      {showClearButton && (
        <span className="left-pan" onClick={onClear}>
          <i className="fa fa-close"></i>
        </span>
      )}
    </div>
  );
}
