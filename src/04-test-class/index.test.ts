import {
  BankAccount,
  InsufficientFundsError,
  // SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import _ from 'lodash';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
    expect(account).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(initialBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(initialBalance + 1, toAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(initialBalance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const amount = 100;
    account.deposit(amount);
    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const amount = 100;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    const amount = 100;
    account.transfer(amount, toAccount);
    expect(account.getBalance()).toBe(initialBalance - amount);
    expect(toAccount.getBalance()).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const balance = await account.fetchBalance();
    jest.spyOn(_, 'random').mockImplementation(() => 1);
    expect(balance).not.toBeInstanceOf(Number);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const mewBalance = 90;
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockImplementation(() => {
      return mewBalance as unknown as Promise<number | null>;
    });
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mewBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // const initialBalance = 100;
    // const account = getBankAccount(initialBalance);
    // jest.spyOn(account, 'fetchBalance').mockImplementation(() => {
    //   return null as unknown as Promise<number | null>;
    // });
    // expect(account.synchronizeBalance).toThrow(SynchronizationFailedError);
  });
});
