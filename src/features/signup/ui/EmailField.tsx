import Input from '@/shared/ui/Input/Input';
import Label from '@/shared/ui/Label';

const EmailField = () => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="signup-email" textSize="16_M">
        이메일
      </Label>
      <Input
        {...register('email', {
          required: '이메일을 입력해 주세요.',
          validate: (value) =>
            Email.safeParse(value).success || '올바른 이메일 형식을 입력해 주세요.',
        })}
        id="signup-email"
        type="email"
        placeholder="이메일을 입력해주세요"
        error={!!errors.email}
        errorMsg={errors.email?.message}
        autoComplete="email"
      />
    </div>
  );
};

export default EmailField;
