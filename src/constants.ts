import JSBI from 'jsbi';

// exports for external consumption
export type BigintIsh = JSBI | bigint | string;

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
}

export enum LiquidityProvider {
  PLASMA,
  UNISWAP,
  SUSHISWAP,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const FACTORY_ADDRESS = {
  [LiquidityProvider.UNISWAP]: {
    [ChainId.MAINNET]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    [ChainId.ROPSTEN]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    [ChainId.RINKEBY]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    [ChainId.GÖRLI]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    [ChainId.KOVAN]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  },
  [LiquidityProvider.PLASMA]: {
    [ChainId.MAINNET]: '0xd87Ad19db2c4cCbf897106dE034D52e3DD90ea60',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.GÖRLI]: '',
    [ChainId.KOVAN]: '0x7A6521ba7Ba45C908be726D719ACd547D4a8E246',
  },
  [LiquidityProvider.SUSHISWAP]: {
    [ChainId.MAINNET]: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.GÖRLI]: '',
    [ChainId.KOVAN]: '0x8D4FD620CB7Ed677870b8b62f22c166cC76fb519',
  },
};

export const ROUTER_ADDRESS = {
  [LiquidityProvider.UNISWAP]: {
    [ChainId.MAINNET]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    [ChainId.ROPSTEN]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    [ChainId.RINKEBY]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    [ChainId.GÖRLI]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    [ChainId.KOVAN]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  },
  [LiquidityProvider.PLASMA]: {
    [ChainId.MAINNET]: '0x5ec243F1F7ECFC137e98365C30c9A28691d86132',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.GÖRLI]: '',
    [ChainId.KOVAN]: '0x905df0e2cd022bc1a67bf15df485b18ea631d304',
  },
  [LiquidityProvider.SUSHISWAP]: {
    [ChainId.MAINNET]: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.GÖRLI]: '',
    [ChainId.KOVAN]: '0x4A0b3a56ECb360924639F57Cd41d0358Aed9aCDd',
  },
};

export const INIT_CODE_HASH = {
  [LiquidityProvider.UNISWAP]: {
    [ChainId.MAINNET]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    [ChainId.ROPSTEN]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    [ChainId.RINKEBY]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    [ChainId.GÖRLI]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    [ChainId.KOVAN]: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  },
  [LiquidityProvider.PLASMA]: {
    [ChainId.MAINNET]: '0x611ee9501fb19c9df82695e66f6c58d69d86907b531dfbed652231515ae84081',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.GÖRLI]: '',
    [ChainId.KOVAN]: '0xe60eb03e61b5fbeba179f6defb71bb00c5db9dab3b10d39c3985d66081de6d3d',
  },
  [LiquidityProvider.SUSHISWAP]: {
    [ChainId.MAINNET]: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    [ChainId.ROPSTEN]: '',
    [ChainId.RINKEBY]: '',
    [ChainId.GÖRLI]: '',
    [ChainId.KOVAN]: '0xa0f8210a4091231cb34588d36a21ac73a6681adda0d825bf06c963da5ff4af47',
  },
};

export const FACTORY_CREATED_AT_TIMESTAMP = {
  [LiquidityProvider.UNISWAP]: 1588609990,
  [LiquidityProvider.PLASMA]: 1611490340,
  [LiquidityProvider.SUSHISWAP]: 1599214223,
};

export const FACTORY_CREATED_AT_BLOCK_NUMBER = {
  [LiquidityProvider.UNISWAP]: 10000834,
  [LiquidityProvider.PLASMA]: 11718233,
  [LiquidityProvider.SUSHISWAP]: 10794228,
};

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

export const LIQUIDITY_TOKEN_NAME = {
  [LiquidityProvider.UNISWAP]: 'Uniswap V2',
  [LiquidityProvider.PLASMA]: 'Plasmaswap',
  [LiquidityProvider.SUSHISWAP]: 'Sushiswap',
};

export const LIQUIDITY_TOKEN_SYMBOL = {
  [LiquidityProvider.UNISWAP]: 'UNI-V2',
  [LiquidityProvider.PLASMA]: 'P-LP',
  [LiquidityProvider.SUSHISWAP]: 'SLP',
};

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);
export const THREE = JSBI.BigInt(3);
export const FIVE = JSBI.BigInt(5);
export const TEN = JSBI.BigInt(10);
export const _100 = JSBI.BigInt(100);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
};
