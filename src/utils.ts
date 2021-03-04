import { getAddress } from '@ethersproject/address';
import JSBI from 'jsbi';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

import {
  BigintIsh,
  ChainId,
  FACTORY_ADDRESS,
  FACTORY_CREATED_AT_BLOCK_NUMBER,
  FACTORY_CREATED_AT_TIMESTAMP,
  INIT_CODE_HASH,
  LiquidityProvider,
  ONE,
  ROUTER_ADDRESS,
  SOLIDITY_TYPE_MAXIMA,
  SolidityType,
  THREE,
  TWO,
  ZERO,
} from './constants';

export function validateSolidityTypeInstance(value: JSBI, solidityType: SolidityType): void {
  invariant(JSBI.greaterThanOrEqual(value, ZERO), `${value} is not a ${solidityType}.`);
  invariant(JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]), `${value} is not a ${solidityType}.`);
}

// warns if addresses are not checksummed
export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address);
    warning(address === checksummedAddress, `${address} is not checksummed.`);
    return checksummedAddress;
  } catch (error) {
    invariant(false, `${address} is not a valid address.`);
  }
}

export function parseBigintIsh(bigintIsh: BigintIsh): JSBI {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
}

// mock the on-chain sqrt function
export function sqrt(y: JSBI): JSBI {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  let z: JSBI = ZERO;
  let x: JSBI;
  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);
    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }
  return z;
}

// given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item
export function sortedInsert<T>(items: T[], add: T, maxSize: number, comparator: (a: T, b: T) => number): T | null {
  invariant(maxSize > 0, 'MAX_SIZE_ZERO');
  // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize
  invariant(items.length <= maxSize, 'ITEMS_SIZE');

  // short circuit first item add
  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    const isFull = items.length === maxSize;
    // short circuit if full and the additional item does not come before the last item
    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    let lo = 0,
      hi = items.length;

    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    items.splice(lo, 0, add);
    return isFull ? items.pop()! : null;
  }
}

export function getRouterAddress(chainId?: ChainId, liquidityProvider?: LiquidityProvider): string | null {
  if (chainId === undefined || liquidityProvider === undefined) {
    return null;
  }
  return ROUTER_ADDRESS?.[liquidityProvider]?.[chainId] ?? null;
}

export function getFactoryAddress(chainId?: ChainId, liquidityProvider?: LiquidityProvider): string | null {
  if (chainId === undefined || liquidityProvider === undefined) {
    return null;
  }
  return FACTORY_ADDRESS?.[liquidityProvider]?.[chainId] ?? null;
}

export function getInitCodeHash(chainId?: ChainId, liquidityProvider?: LiquidityProvider): string | null {
  if (chainId === undefined || liquidityProvider === undefined) {
    return null;
  }
  return INIT_CODE_HASH?.[liquidityProvider]?.[chainId] ?? null;
}

export function getFactoryCreatedAt(lp: LiquidityProvider): { blockNumber: number; timestamp: number } {
  return {
    blockNumber: FACTORY_CREATED_AT_BLOCK_NUMBER[lp],
    timestamp: FACTORY_CREATED_AT_TIMESTAMP[lp],
  };
}
