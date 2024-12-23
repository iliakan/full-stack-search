export interface SearchResultItemProps {
  label: string;
  link: string;
}

export function SearchResultItem({ label, link }: SearchResultItemProps) {
  return (
    <li>
      <a href={link} className="dropdown-item">
        <i className="fa fa-building mr-2"></i>
        {label}
      </a>
      <hr className="divider" />
    </li>
  );
}
