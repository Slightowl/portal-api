import { Input } from "src/components/atoms/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components/macro";
import React from "react";
import { isNullOrWhitespace } from "src/utils/string-utils";

interface IProps {
  className?: string;
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

const SearchInput = styled.div`
  width: 250px;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
`;

export const QuickSearch: React.FC<IProps> = (props): JSX.Element => {
  const [showIcon, setShowIcon] = React.useState<boolean>(true);

  const handleInputChange = (value: string) => {
    setShowIcon(isNullOrWhitespace(value));
  }

  return (
    <SearchInput className={props.className}>
      <Input
        placeholder={props.placeholder}
        onChange={handleInputChange}
        onSubmit={props.onSearch}
        clearOnSubmit
        small
      />
      {
        showIcon &&
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} fixedWidth={true} size="sm" />
        </SearchIcon>
      }
    </SearchInput>
  )
}

QuickSearch.defaultProps = {
  placeholder: 'Search...',
}
