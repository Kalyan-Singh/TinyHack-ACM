import logo from './logo.svg';
import './App.css';
import { polygonMumbai } from 'wagmi/chains';
import AllCameras from './AllCameras';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider,darkTheme, ConnectButton } from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// const { chains, provider, webSocketProvider } = configureChains(
//   [chain.polygonMumbai],
 
// );
const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: "f8TXTM1cuIoEj67B3c9Cm73LeT0xvLR2" }),
    publicProvider(),
  ]
);



const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function App() {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <AllCameras></AllCameras>
    </RainbowKitProvider>
  </WagmiConfig>
  );
}

export default App;
