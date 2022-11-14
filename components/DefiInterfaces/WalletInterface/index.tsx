import React, { useEffect, useState } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import SelectButton from "./SelectButton";
import Balances from "./Balances";
import Transaction from "./Transaction";

//API KEY
const API_KEY = "ckey_167eab964c91406eb344e305775";

function WalletInterface() {
  const [items, setItems] = useState([]);
  const TextColorMode1 = useColorModeValue("black", "gray.400");

  useEffect(() => {
    items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //https: //api.covalenthq.com/v1/1/address/0xD0355200111C2B21AAbC1a31552eCCDc5d4E905d/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_167eab964c91406eb344e305775
  // https://api.covalenthq.com/v1/1/address/0xD0355200111C2B21AAbC1a31552eCCDc5d4E905d/portfolio_v2/?quote-currency=USD&format=JSON&key=ckey_167eab964c91406eb344e305775
  // https://api.covalenthq.com/v1/1/address/0xD0355200111C2B21AAbC1a31552eCCDc5d4E905d/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_167eab964c91406eb344e305775

  const getWallet = async (e) => {
    const chainId = e.target.elements.chainId.value;
    e.preventDefault();
    const userAddress = e.target.elements.userAddress.value;
    e.preventDefault();
    const walletsStatus = e.target.elements.walletsStatus.value;
    e.preventDefault();

    const response = await fetch(
      `https://api.covalenthq.com/v1/${chainId}/address/${userAddress}/${walletsStatus}/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${API_KEY}`
    );
    const data = await response.json();
    setItems(data.data.items);
    //console.log(items);
  };

  return (
    <Box>
      <Box mt={7}>
        <Text
          ml={10}
          right={2}
          letterSpacing={1}
          fontSize="xl"
          fontWeight="semibold"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Transactions History
        </Text>
        <Text
          ml={10}
          right={2}
          color="gray.400"
          letterSpacing={1}
          fontSize="md"
          fontWeight="thin"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Overview
        </Text>
      </Box>
      <Box mx="25%" mt={10}>
        <SelectButton getWallet={getWallet} />
      </Box>

      {/* <Box mx="10%" mt={10}>
        <Text
          ml={10}
          right={2}
          color={TextColorMode1}
          letterSpacing={1}
          fontSize="md"
          fontWeight="semibold"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Wallet Balance Overview
        </Text>
        <Balances getBalance={items} />
      </Box> */}

      <Box mx="10%" mt={10}>
        <Text
          ml={10}
          right={2}
          color={TextColorMode1}
          letterSpacing={1}
          fontSize="md"
          fontWeight="semibold"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Transaction History
        </Text>
        <Transaction getTransaction={items} />
      </Box>
    </Box>
  );
}
export default WalletInterface;
