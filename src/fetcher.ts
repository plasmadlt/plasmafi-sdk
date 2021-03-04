import { Contract } from '@ethersproject/contracts';
import { getNetwork } from '@ethersproject/networks';
import { getDefaultProvider } from '@ethersproject/providers';
import invariant from 'tiny-invariant';
import IERC20 from './abis/erc20.json';
import ISwapPair from './abis/swap-pair.json';
import { ChainId, LiquidityProvider } from './constants';
import { TokenAmount } from './entities/fractions/tokenAmount';
import { Pair } from './entities/pair';
import { Token } from './entities/token';

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {
  [ChainId.MAINNET]: {
    '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9, // DGD
  },
};

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainId)),
    symbol?: string,
    name?: string,
  ): Promise<Token> {
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await new Contract(address, IERC20, provider).decimals().then((decimals: number): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals,
              },
            };
            return decimals;
          });
    return new Token(chainId, address, parsedDecimals, symbol, name);
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param liquidityProvider
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(
    tokenA: Token,
    tokenB: Token,
    liquidityProvider: LiquidityProvider,
    provider = getDefaultProvider(getNetwork(tokenA.chainId)),
  ): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID');

    const address = Pair.getAddress(tokenA, tokenB, liquidityProvider);
    const [reserves0, reserves1] = await new Contract(address, ISwapPair, provider).getReserves();

    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];

    return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]), liquidityProvider);
  }
}
