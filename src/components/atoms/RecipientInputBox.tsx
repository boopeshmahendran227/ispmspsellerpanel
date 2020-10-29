import {
  Box,
  Stack,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Divider,
  List,
  ListItem,
} from "@chakra-ui/core";
import { useRef, useState } from "react";
import useSWR from "swr";
import {
  RecipientInterface,
  RecipientType,
  SuggestedUserInterface,
} from "types/bulkSms";
import Loader from "./Loader";
import { User, Phone } from "react-feather";
import RoundedIcon from "components/atoms/RoundedIcon";

interface RecipientInputBoxProps {
  recipients: RecipientInterface[];
  onChange: (recipient: RecipientInterface[]) => void;
}

const RecipientInputBox = (props: RecipientInputBoxProps) => {
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const suggestionsSWR = useSWR(`/bulksms?searchText=${searchText}`);
  const suggestions: SuggestedUserInterface[] = suggestionsSWR.data;

  const handleFocus = () => {
    if (searchInput.current !== null) {
      return searchInput.current.focus();
    }
  };

  const { recipients, onChange } = props;

  return (
    <Box
      onClick={handleFocus}
      border="1px"
      borderColor="#ccc"
      minH="20vh"
      w="100%"
      p={2}
      borderRadius={5}
    >
      {recipients.map((recipient, index) => (
        <Tag
          key={index}
          size={"sm"}
          m={1}
          rounded="full"
          variant="solid"
          fontSize={["xs", "sm"]}
          variantColor={
            recipient.recipientType === RecipientType.NonExistingUser
              ? "red"
              : "blue"
          }
        >
          <TagLabel>{`${recipient.name}(${recipient.phoneNumber})`}</TagLabel>
          <TagCloseButton
            onClick={() => {
              onChange(recipients.filter((value) => value.id !== recipient.id));
            }}
          />
        </Tag>
      ))}
      <Box>
        <Input
          ref={searchInput}
          variant="unstyled"
          name="search"
          placeholder="Add Recipients"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Box
          maxH={"40vh"}
          bg="white"
          boxShadow={searchText === "" ? "none" : "md"}
          fontSize="md"
          p={1}
          cursor="pointer"
          overflowY="auto"
        >
          {!suggestions ? (
            suggestionsSWR.isValidating ? (
              <Loader size="xs" height="10px" loaderWidth="1px" />
            ) : null
          ) : (
            <List>
              {(searchText.match(/^[+][91]{2}[0-9]{10}$/) ||
                searchText.match(/^[0-9]{10}$/)) && (
                <ListItem>
                  <Stack
                    my={1}
                    onClick={() => {
                      if (
                        recipients.some(
                          (recipient) => recipient.phoneNumber === searchText
                        )
                      ) {
                        return;
                      }
                      onChange([
                        ...recipients,
                        {
                          name: "unknown",
                          phoneNumber: searchText,
                          id: searchText,
                          recipientType: RecipientType.NonExistingUser,
                        },
                      ]);
                      setSearchText("");
                    }}
                    isInline
                    spacing={1}
                  >
                    <RoundedIcon
                      icon={<Phone />}
                      color="dangerColorVariant"
                      size="40px"
                    />
                    <Box ml={2} fontWeight="bold">
                      {searchText}
                    </Box>
                  </Stack>
                </ListItem>
              )}
              {suggestions.map((suggestedUser, index) => (
                <ListItem
                  key={index}
                  onClick={() => {
                    if (
                      recipients.some(
                        (recipient) => recipient.id === suggestedUser.id
                      )
                    ) {
                      return;
                    }
                    onChange([
                      ...recipients,
                      {
                        name: suggestedUser.name,
                        phoneNumber: suggestedUser.phoneNumber,
                        id: suggestedUser.id,
                        recipientType: RecipientType.ExistingUser,
                      },
                    ]);
                    setSearchText("");
                  }}
                >
                  <Stack isInline spacing={1}>
                    <RoundedIcon
                      icon={<User />}
                      color="successColorVariant"
                      size="40px"
                    />
                    <Box ml={2}>
                      <Box fontWeight="bold" fontSize="md">
                        {suggestedUser.name}
                      </Box>
                      <Box>{suggestedUser.phoneNumber}</Box>
                    </Box>
                  </Stack>
                  <Divider />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RecipientInputBox;
