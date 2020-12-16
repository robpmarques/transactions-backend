import { Router } from 'express';

import {
  getCustomRepository,
  getRepository,
  TransactionRepository,
} from 'typeorm';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transaction = await transactionRepository.find();

  const transactionBalance = await transactionRepository.getBalance();

  return response.json({
    transaction,
    balance: transactionBalance,
  });
});

transactionsRouter.post('/', async (request, response) => {
  const { type, value, title, category } = request.body;

  const createTransactionService = new CreateTransactionService();

  const categoryRepository = getRepository(Category);

  let categoryObj = await categoryRepository.findOne({
    where: { title: category },
  });

  if (!categoryObj) {
    const categoryPayload = categoryRepository.create({ title: category });

    categoryObj = await categoryRepository.save(categoryPayload);
  }

  const transaction = await createTransactionService.execute({
    type,
    value,
    title,
    category_id: categoryObj.id,
  });

  delete transaction.category_id;

  return response.json({
    ...transaction,
    category: categoryObj.title,
  });
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
