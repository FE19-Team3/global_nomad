import { createApiError } from '@/shared/api';

type SchemaParseSuccess<T> = { success: true; data: T };
type SchemaParseFailure = {
  success: false;
  error: {
    flatten: (mapper: (issue: { message: string }) => string) => {
      formErrors: string[];
      fieldErrors: Record<string, string[]>;
    };
  };
};

export type SchemaParser<T> = {
  safeParse: (data: unknown) => SchemaParseSuccess<T> | SchemaParseFailure;
};

type ParseJsonOptions<T> = {
  schema?: SchemaParser<T>;
};

export const parseJsonResponse = async <T>(
  res: Response,
  options: ParseJsonOptions<T> = {},
): Promise<T> => {
  if (res.status === 204) {
    throw createApiError({
      // 호출부에서 성공으로 오해하지 않도록 204도 에러로 처리
      status: 204,
      message: 'No Content(204)',
    });
  }

  const contentType = res.headers.get('Content-Type') ?? '';
  if (!contentType.includes('application/json')) {
    throw createApiError({
      status: 500,
      message: 'JSON 응답이 아닙니다.',
    });
  }

  const data = await res.json();

  if (typeof data === 'string' && data.trim() !== '') {
    return data as T;
  }

  if (options.schema) {
    const parsed = options.schema.safeParse(data);
    if (!parsed.success) {
      const flat = parsed.error.flatten((i) => i.message);
      throw createApiError({
        status: 500,
        message: '응답 데이터 형식이 올바르지 않습니다.',
        details: { meta: flat },
      });
    }
    return parsed.data;
  }

  return data as T;
};
