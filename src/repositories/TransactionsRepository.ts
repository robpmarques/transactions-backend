import { EntityRepository, getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.find();

    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    transaction.map(item => {
      balance[item.type] += item.value;

      balance.total = balance.income - balance.outcome;
    });

    return balance;
  }
}

export default TransactionsRepository;
