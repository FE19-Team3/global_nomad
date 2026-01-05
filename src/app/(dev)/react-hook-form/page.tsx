'use client';

import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
};

const SampleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onSubmit = (data: FormValues) => {
    alert(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: '이메일은 필수입니다.' })} placeholder="이메일" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">확인</button>
    </form>
  );
};

export default SampleForm;
