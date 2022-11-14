import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function BuyCrypto() {
  const TextTitleColor = useColorModeValue("black", "black");

  return (
    <Box my="5">
      <Text
        color={TextTitleColor}
        mb={2}
        letterSpacing={1}
        fontSize="xl"
        fontWeight="semibold"
        decoration="lightblue"
        textTransform="uppercase"
      >
        Buy Cryptocurrenciess
      </Text>
      <Box alignItems="center">
        <Box
          as="iframe"
          height="652"
          width="100%"
          src="https://staging-global.transak.com?apiKey=3f723d23-97d1-4b9e-9c90-8671e0ffc036"
        />
      </Box>
    </Box>
  );
}
