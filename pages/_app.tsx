import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider, chain, createClient, defaultChains } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const alchemyId = "eSuujOEuvvJfIAbtfVd3BQET_xK_qc6n";

const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
      : chain.rpcUrls.default;
    return [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { name: "Injected" },
      }),
    ];
  },
});
//const client = createClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider client={client}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>

async  function  connect() {
/** MetaMask injects a global API into websites visited by its users at `window.ethereum`. This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions. The presence of the provider object indicates an Ethereum user. Read more: https://ethereum.stackexchange.com/a/68294/85979**/

// Check if MetaMask is installed, if it is, try connecting to an account
    if (typeof  window.ethereum !== "undefined") {
        try {
            console.log("connecting");
            // Requests that the user provides an Ethereum address to be identified by. The request causes a MetaMask popup to appear. Read more: https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
            await  ethereum.request({ method:  "eth_requestAccounts" });
        } catch (error) {
        console.log(error);
        }
        // If connected, change button to "Connected"
        document.getElementById("login_button").innerHTML = "Connected";
        // If connected, enable "Swap" button
        document.getElementById("swap_button").disabled = false;
        } 
        // Ask user to install MetaMask if it's not detected 
        else {
        document.getElementById("login_button").innerHTML =
            "Please install MetaMask";
        }
    }
// Call the connect function when the login_button is clicked
document.getElementById("login_button").onclick = connect;
  );
}

export default MyApp;
