import { z } from 'zod';

export const Id = z.number();

export const ISODateTime = z.string().datetime();

// YYYY-MM-DD
export const DateYMD = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.');

// HH:MM:SS
// 마찬가지로 정규표현식을 사용합니다.
export const TimeHM = z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'HH:MM:SS 형식이어야 합니다.');

// URL
// Zod 3에서는 string().url()을 사용합니다.
export const Url = z.string().url();

// 공백 불가 문자열
export const NonEmptyString = z.string().trim().min(1);

// 가격, 금액
export const Price = z.number().nonnegative();

// 평점
export const Rating = z.number().min(0).max(5);

// 단순 boolean
export const Bool = z.boolean();
