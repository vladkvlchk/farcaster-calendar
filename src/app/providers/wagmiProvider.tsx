// // app/providers/wagmiProvider.tsx

// import { WagmiConfig, createClient, chain, configureChains } from 'wagmi';
// import { alchemyProvider } from 'wagmi/providers/alchemy'; // Можна використовувати різні провайдери, наприклад, Alchemy або Infura
// import { InjectedConnector } from 'wagmi/connectors/injected';

// const { chains, provider, webSocketProvider } = configureChains(
//   [chain.mainnet, chain.goerli],
//   [alchemyProvider({ alchemyId: 'YOUR_ALCHEMY_ID' })]
// );

// const client = createClient({
//   autoConnect: true,
//   connectors: [
//     new InjectedConnector({
//       chains,
//     }),
//   ],
//   provider,
//   webSocketProvider,
// });

// export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
//   return <WagmiConfig client={client}>{children}</WmiConfig>;
// };
