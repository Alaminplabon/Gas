// src/modules/question/question.service.ts

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { IQuestion } from './question.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import Question from './question.models';

// Create a new question
const createquestion = async (payload: IQuestion) => {
  const result = await Question.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create question');
  }
  return result;
};

// Get all questions with pagination, filter, search, and population
const getAllquestion = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Question.find(), query)
    .search(['text']) // allows searching inside question text
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();
  return { data, meta };
};

// Get a question by ID
const getquestionById = async (id: string) => {
  const result = await Question.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Question not found');
  }
  return result;
};

// Update a question
const updatequestion = async (id: string, payload: Partial<IQuestion>) => {
  const result = await Question.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update question');
  }
  return result;
};

// Delete a question
const deletequestion = async (id: string) => {
  const result = await Question.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete question');
  }
  return result;
};

export const questionService = {
  createquestion,
  getAllquestion,
  getquestionById,
  updatequestion,
  deletequestion,
};
