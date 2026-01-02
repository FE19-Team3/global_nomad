import { z } from 'zod';

import { Email, Password } from '@/shared/schema/auth';

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해 주세요.')
      .email('이메일 형식으로 작성해 주세요.')
      .pipe(Email),

    password: z
      .string()
      .min(1, '비밀번호를 입력해 주세요.')
      .min(8, '8자 이상 입력해 주세요.')
      .pipe(Password),

    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
