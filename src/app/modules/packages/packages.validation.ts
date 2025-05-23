import z from 'zod';

const createPackageValidator = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, 'Title cannot be empty'),
    shortTitle: z
      .string({ required_error: 'Short title is required' })
      .min(1, 'Short title cannot be empty'),
    shortDescription: z
      .string({ required_error: 'Short description is required' })
      .min(1, 'Short description cannot be empty'),
  }),
});

const updatePackageValidator = z.object({
  body: z
    .object({
      title: z
        .string({ required_error: 'Title is required' })
        .min(1, 'Title cannot be empty'),
      shortTitle: z
        .string({ required_error: 'Short title is required' })
        .min(1, 'Short title cannot be empty'),
      shortDescription: z
        .string({ required_error: 'Short description is required' })
        .min(1, 'Short description cannot be empty'),
      price: z
        .number({ required_error: 'Price is required' })
        .min(0, 'Price must be a non-negative number'),
      durationDay: z
        .number({ required_error: 'Total classes are required' })
        .min(0, 'Total classes must be a non-negative number'),
    })
    .deepPartial(),
});

export const packageValidator = {
  createPackageValidator,
  updatePackageValidator,
};
