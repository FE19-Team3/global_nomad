import { useState, ChangeEvent } from 'react';

type ValidateFn = (value: string) => string | null;
type SanitizeFn = (value: string) => string;

export const useField = (
  initial: string,
  opts: {
    validate?: ValidateFn;
    sanitize: SanitizeFn;
  },
) => {
  const { validate, sanitize } = opts;
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = sanitize(e.target.value);
    setValue(next);
  };

  const onBlur = () => {
    setTouched(true);
    if (validate) setError(validate(value));
  };

  return { value, setValue, error, setError, touched, setTouched, onChange, onBlur };
};
