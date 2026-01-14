import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, Resolver } from 'react-hook-form';

export const createZodResolver = <TFieldValues extends FieldValues>(
  schema: unknown,
): Resolver<TFieldValues> => zodResolver(schema as Parameters<typeof zodResolver>[0]);
