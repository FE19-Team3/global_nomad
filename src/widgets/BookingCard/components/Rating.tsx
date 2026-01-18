import { Fragment } from 'react/jsx-runtime';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import Ic_rating_star from '@/shared/assets/icons/ic_rating_star.svg';

type RatingProps<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
};

export const Rating = <TFieldValues extends FieldValues>({
  register,
  name,
}: RatingProps<TFieldValues>) => {
  const DefaultValue = 4;
  return (
    <fieldset className="flex items-center">
      <legend className="sr-only">별점</legend>

      <div className="flex flex-row-reverse gap-3 py-3">
        {[5, 4, 3, 2, 1].map((value) => (
          <Fragment key={value}>
            <input
              id={`rating-${value}`}
              type="radio"
              value={value}
              className="peer sr-only"
              defaultChecked={value === DefaultValue}
              {...register(name)}
              required
            />
            <label
              htmlFor={`rating-${value}`}
              className="text-gray-300 peer-checked:text-yellow-400 cursor-pointer"
            >
              <Ic_rating_star className="size-10" />
            </label>
          </Fragment>
        ))}
      </div>
    </fieldset>
  );
};
