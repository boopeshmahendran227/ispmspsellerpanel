import CSSConstants from "../../constants/CSSConstants";
import _ from "lodash";
import { ChangeEvent } from "react";
import {
  Input,
  InputGroup,
  IconButton,
  InputRightAddon,
} from "@chakra-ui/core";

interface SearchBarProps {
  searchText: string;
  searchByText: (text: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.searchByText(value);
  };

  const handleCloseBtnClick = () => {
    props.searchByText("");
  };

  return (
    <InputGroup
      borderRadius={5}
      overflow="hidden"
      bg="#fff"
      border="1px solid #f5f5f6"
      transition="all 0.3s"
      fontSize="md"
      boxShadow="sm"
      pl={2}
      minW={["250px","300px"]}
      width="100%"
      textAlign="center"
    >
      <Input
        _placeholder={{ textAlign: "center" }}
        variant="unstyled"
        name="search"
        autoComplete="off" // desperately tring to turn off autocompletion
        placeholder="Search for products"
        onChange={handleInputChange}
        value={props.searchText}
      />
      <InputRightAddon bg="white" borderRight={0} p={0}>
        {Boolean(props.searchText) && (
          <IconButton
            _hover={{ bg: "white" }}
            _focus={{ bg: "white" }}
            bg="white"
            aria-label="Search database"
            icon="close"
            size="sm"
            onClick={handleCloseBtnClick}
            color="grey"
          />
        )}
        <IconButton
          _hover={{ bg: "white" }}
          _focus={{ bg: "white" }}
          type="submit"
          bg="white"
          aria-label="Search database"
          icon="search"
          color="grey"
        />
      </InputRightAddon>
    </InputGroup>
  );
};

export default SearchBar;
