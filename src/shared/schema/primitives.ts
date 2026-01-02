import { z } from 'zod';

// 백엔드 $double 숫자 id 사용
export const Id = z.number();

// ISO 8601 DateTime ex)2025-01-01T12:00:00Z
export const ISODateTime = z.iso.datetime();

// YYYY-MM-DD
export const DateYMD = z.iso.date();

// HH:MM:SS
export const TimeHM = z.iso.time();

// URL
export const Url = z.url();

// 공백 불가 문자열
export const NonEmptyString = z.string().trim().min(1);

// 가격, 금액
export const Price = z.number().nonnegative();

// 평점
export const Rating = z.number().min(0).max(5);

// 단순 boolean
export const Bool = z.boolean();
