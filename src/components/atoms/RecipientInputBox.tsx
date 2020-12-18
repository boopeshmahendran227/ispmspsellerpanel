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
  Flex,
  TagIcon,
} from "@chakra-ui/core";
import { useRef, useState } from "react";
import useSWR from "swr";
import {
  BulkSmsGroup,
  RecipientType,
  SuggestedUserInterface,
  User,
  UserGroup,
} from "types/bulkSms";
import Loader from "./Loader";
import { capitalizeFirstLetter } from "utils/misc";

interface RecipientInputBoxProps {
  recipients: (User | UserGroup)[];
  onChange: (recipient: (UserGroup | User)[]) => void;
}

const RecipientInputBox = (props: RecipientInputBoxProps) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const groupsSwr = useSWR("/bulksms/groups");
  const groups: BulkSmsGroup[] = groupsSwr.data;
  const suggestionsSWR = useSWR(
    searchText ? `/bulksms?searchText=${searchText}` : null
  );
  const suggestions: SuggestedUserInterface[] = suggestionsSWR.data;

  const handleFocus = () => {
    if (searchInput.current) {
      return searchInput.current.focus();
    }
  };

  const { recipients, onChange } = props;

  return (
    <>
      {groups && (
        <Flex wrap="wrap" mt={0} justify="flex-end">
          {groups.map((group) => (
            <Tag
              key={group.groupId}
              mx={1}
              p={1}
              mb={2}
              size={"sm"}
              cursor="pointer"
              variantColor="primaryColorVariant"
              variant={
                recipients.some((recipient) => group.groupId === recipient.id)
                  ? "solid"
                  : "outline"
              }
              onClick={() => {
                if (
                  recipients.some((recipient) => recipient.id === group.groupId)
                ) {
                  onChange(
                    recipients.filter(
                      (recipient) => group.groupId !== recipient.id
                    )
                  );
                  return;
                }
                onChange([
                  ...recipients,
                  {
                    name: group.groupName,
                    id: group.groupId,
                    recipientType: RecipientType.Group,
                    numberOfRecipients: group.noOfRecipients,
                  },
                ]);
              }}
            >
              <TagIcon icon="add" size="12px" />
              <TagLabel>
                {group.groupName} ({group.noOfRecipients})
              </TagLabel>
            </Tag>
          ))}
        </Flex>
      )}
      <Box
        onClick={handleFocus}
        border="1px"
        borderColor="borderColor.500"
        minH="20vh"
        w="100%"
        p={2}
        borderRadius={5}
      >
        {recipients.map((recipient) => (
          <Tag
            key={recipient.id}
            size={"sm"}
            m={1}
            variant="solid"
            rounded="full"
            fontSize={["xs", "sm"]}
            variantColor={
              recipient.recipientType === RecipientType.NonExistingUser
                ? "dangerColorVariant"
                : "primaryColorVariant"
            }
          >
            <TagLabel>{`${capitalizeFirstLetter(recipient.name)} (${
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
            placeholder="Search by customer name or number"
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
            {!searchText || !suggestions ? (
              suggestionsSWR.isValidating ? (
                <Loader size="sm" height="35px" loaderWidth="2px" />
              ) : null
            ) : (
              <List>
                {(searchText.match(/^[+][9]{1}[1]{1}[0-9]{10}$/) ||
                  searchText.match(/^[0-9]{10}$/)) && (
                  <ListItem my={1} px={2} py={1} _hover={{ bg: "gray.50" }}>
                    <Stack
                      opacity={
                        recipients
                          .filter(
                            (recipient) =>
                              recipient.recipientType !== RecipientType.Group
                          )
                          .some(
                            (recipient) =>
                              (recipient as User).phoneNumber === searchText
                          )
                          ? 0.5
                          : 1
                      }
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
                      spacing={3}
                    >
                      <Avatar name={searchText} size="md" />
                      <Box fontWeight="bold">{searchText}</Box>
                    </Stack>
                  </ListItem>
                )}
                {suggestions.map((suggestedUser, index) => (
                  <ListItem
                    _hover={{ bg: "gray.50" }}
                    my={2}
                    p={2}
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
                    <Stack
                      isInline
                      spacing={3}
                      alignItems="center"
                      opacity={
                        recipients.some(
                          (recipient) => recipient.id === suggestedUser.id
                        )
                          ? 0.5
                          : 1
                      }
                    >
                      <Avatar name={suggestedUser.name} size={"md"} />
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
        color={"secondaryTextColor.500"}
        my={1}
        mr={1}
      >
        Total Recipients:{" "}
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
