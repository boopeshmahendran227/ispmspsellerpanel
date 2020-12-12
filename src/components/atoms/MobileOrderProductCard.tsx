import { Box, Text, SimpleGrid, Flex, Image, Grid } from "@chakra-ui/core";
import React from "react";
import { OrderStatus } from "types/order";
import { getColor, getOrderStatusText } from "utils/order";
import { getProductImageUrl } from "utils/url";

interface MobileProductCardInterface {
  productName: string;
  productImage: string;
  orderId: number;
  orderItemId: number;
  createdDateTime: string;
  orderItemStatus: OrderStatus;
  skuId: string;
  qty: number;
  price: string;
  buttons: JSX.Element | null;
}

const Key = (props) => (
  <Box as="span" fontWeight="bold" color="black">
    {props.children}
  </Box>
);

const MobileOrderProductCard = (props: MobileProductCardInterface) => {
  return (
    <Box borderRadius={10} mx={1} my={4} boxShadow="0 1px 10px #bebebe" p={4}>
      <Flex fontSize="sm" justify="space-between">
        <Key>
          Order Id: {props.orderId} - {props.orderItemId}
        </Key>
        <Text textAlign="right" color="#a0a0a0">
          {props.createdDateTime}
        </Text>
      </Flex>
      <Flex my={4} fontSize="sm">
        <Image
          flex="0 0 80px"
          size="80px"
          rounded="full"
          mr={4}
          src={getProductImageUrl(props.productImage)}
          boxShadow="0 1px 10px #bebebe"
        />
        <Box>
          <Text fontWeight="bold" fontSize="md" color="black">
            {props.productName}
          </Text>
          <SimpleGrid mt={1} columns={1} color="#a0a0a0" spacingY={1}>
            <Box>
              Sku Id:
              <Key> {props.skuId}</Key>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" color="#a0a0a0" fontSize="sm">
        <Box>
          Qty:
          <Key>&nbsp; &nbsp;{props.qty}</Key>
        </Box>
        <Box justifySelf="right">
          Amount:
          <Key>&nbsp; &nbsp;{props.price}</Key>
        </Box>
      </Flex>
      <Text
        fontWeight="bold"
        color={getColor(props.orderItemStatus)}
        my={4}
        textAlign="right"
      >
        {getOrderStatusText(props.orderItemStatus)}
      </Text>
      <Box mt={2}>{props.buttons}</Box>
    </Box>
  );
};

export default MobileOrderProductCard;
