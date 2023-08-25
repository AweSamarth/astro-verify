import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'

import { MetaMaskConnectorOptions } from "@wagmi/core/connectors/metaMask";




import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "@wagmi/core";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { useEffect } from "react";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, localhost],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "e8b7454adf599824d37e639549fa4f07",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={darkTheme({
          accentColor: "#7000FF",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
