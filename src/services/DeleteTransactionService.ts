import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }

    const transactionBalance = await transactionsRepository.getBalance();

    if (
      transaction.type === 'income' &&
      transactionBalance.total < transaction.value
    ) {
      throw new AppError('You dont have enough money to remove this income');
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
