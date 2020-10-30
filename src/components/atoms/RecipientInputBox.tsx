import {
  Box,
  Stack,
  Input,
  Tag,
  TagLabel,
  List,
  ListItem,
  CloseButton,
  Avatar,
} from "@chakra-ui/core";
import { useRef, useState } from "react";
import useSWR from "swr";
import {
  RecipientType,
  SuggestedUserInterface,
  User,
  UserGroup,
} from "types/bulkSms";
import Loader from "./Loader";

interface RecipientInputBoxProps {
  recipients: (User | UserGroup)[];
  onChange: (recipient: (UserGroup | User)[]) => void;
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
    <>
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
            <TagLabel>{`${recipient.name} (${
              recipient.recipientType === RecipientType.Group
                ? recipient.numberOfRecipients
                : (recipient as User).phoneNumber
            })`}</TagLabel>
            <CloseButton
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              size="sm"
              type="button"
              onClick={() => {
                onChange(
                  recipients.filter((value) => value.id !== recipient.id)
                );
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
            cursor="pointer"
            overflowY="auto"
          >
            {!suggestions ? (
              suggestionsSWR.isValidating ? (
                <Loader size="sm" height="35px" loaderWidth="2px" />
              ) : null
            ) : (
              <List>
                {(searchText.match(/^[+][9]{1}[1]{1}[0-9]{10}$/) ||
                  searchText.match(/^[0-9]{10}$/)) && (
                  <ListItem my={1} px={2} py={1} _hover={{ bg: "gray.50" }}>
                    <Stack
                      onClick={() => {
                        if (
                          recipients.some((recipient) => {
                            if (
                              recipient.recipientType !== RecipientType.Group
                            ) {
                              return recipient.phoneNumber === searchText;
                            }
                          })
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
                      <Avatar name={searchText} size="sm" />
                      <Box fontWeight="bold">{searchText}</Box>
                    </Stack>
                  </ListItem>
                )}
                {suggestions.map((suggestedUser, index) => (
                  <ListItem
                    _hover={{ bg: "gray.50" }}
                    my={1}
                    px={2}
                    py={1}
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
                    <Stack isInline spacing={1} alignItems="center">
                      <Avatar name={suggestedUser.name} size="sm" />
                      <Box>
                        <Box fontWeight="bold" fontSize="md">
                          {suggestedUser.name}
                        </Box>
                        <Box>{suggestedUser.phoneNumber}</Box>
                      </Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        textAlign="right"
        fontSize={12}
        color={"secondaryTextColor"}
        my={1}
        mr={1}
      >
        Total Recipients:
        {recipients
          .filter(
            (recipient) => recipient.recipientType === RecipientType.Group
          )
          .reduce(
            (total, currentNumber) =>
              total + (currentNumber as UserGroup).numberOfRecipients,
            0
          ) +
          recipients.filter(
            (recipents) => recipents.recipientType !== RecipientType.Group
          ).length}
      </Box>
    </>
  );
};

export default RecipientInputBox;
