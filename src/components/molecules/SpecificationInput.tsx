import InputLabel from "../atoms/InputLabel";
import FieldInput from "../atoms/FieldInput";
import FieldEditableArray from "./FieldEditableArray";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import SectionHeader from "../atoms/SectionHeader";
import { Box, SimpleGrid, Divider } from "@chakra-ui/core";

const SpecificationInput = () => {
  const handleAddSpecGroup = (arrayHelpers) => {
    arrayHelpers.push({
      name: "",
      items: [],
    });
  };

  const handleAddSpecItem = (arrayHelpers) => {
    arrayHelpers.push({
      key: "",
      value: "",
    });
  };

  return (
    <Box my={3} fontSize="md">
      <SectionHeaderContainer>
        <SectionHeader>Specification</SectionHeader>
        <Divider borderColor="borderColor.500" />
      </SectionHeaderContainer>
      <FieldEditableArray
        name="specification.itemGroups"
        headers={[]}
        renderInputRow={(groupIndex) => (
          <Box ml={3} className="specGroupContainer">
            <SimpleGrid columns={[1, 2]} alignItems="center">
              <InputLabel label="Group name" />
              <FieldInput
                name={`specification.itemGroups.${groupIndex}.name`}
              />
            </SimpleGrid>
            <FieldEditableArray
              headers={["S.no", "Key", "Value"]}
              name={`specification.itemGroups.${groupIndex}.items`}
              onAdd={handleAddSpecItem}
              renderInputRow={(index) => (
                <>
                  <td>{index + 1}</td>
                  <td>
                    <FieldInput
                      name={`specification.itemGroups.${groupIndex}.items.${index}.key`}
                    />
                  </td>
                  <td>
                    <FieldInput
                      name={`specification.itemGroups.${groupIndex}.items.${index}.value`}
                    />
                  </td>
                </>
              )}
              label="Specification Item"
            />
          </Box>
        )}
        onAdd={handleAddSpecGroup}
        label="Specification Group"
      />
    </Box>
  );
};

export default SpecificationInput;
