# 사용법

컴포넌트에서는 `client`에 위치한 fetch를, BFF(App Routes)에서는 `server`에 위치한 fetch를 사용하시면 됩니다.  
serverClient는 `server-only`기 때문에 서버에서만 호출 가능합니다.

입력 필드

```ts
type Options<T> = {
  path: string;
  //경로
  query?: Query;
  body?: unknown | FormData | string;
  init?: Omit<RequestInit, 'body' | 'method'>;
  //body, method는 넣지 않습니다.
  timeoutMs?: number;
  //타임아웃 (기본 5초)
  retryConfig?: RetryConfig;
  schema: ZodType<T>;
  // 응답을 받는 모든 요청은 응답 스키마가 필수입니다
};

type Query = Record<string, string | number>;

type RetryConfig = {
  maxRetries?: number;
  //최대 재시도 횟수
  baseDelay?: number;
  // 몇 ms 간격으로 재시도 할지
  maxDelay?: number;
  //재시도마다 대기 간격이 길어지기 때문에 최대 재시도 간격
  retryOn?: number[];
  // 재시도할 상태 코드 배열
  jitter?: boolean;
  // 재시도 딜레이에 랜덤성 부여
  // 예를 들어 delay 1초에 랜덤성을 부여하면 0.8~1.2 사이의 랜덤성을 가지고 재시도
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  // fetch 자체가 실패했을 때(타임아웃, 네트워크 에러 등)
  // 재시도를 계속할지 여부를 결정하는 콜백입니다.
  // 지정하지 않으면 fetch에서 throw된 모든 예외 전부 재시도를 시도합니다.
};

// 재시도 기본값
const defaultRetryConfig = {
  maxRetries: 2,
  baseDelay: 1000,
  maxDelay: 10000,
  retryOn: [408, 429, 500, 502, 503, 504],
  jitter: true,
};
```

5개의 메서드가 존재합니다.

`get, post, patch, upload(image)`

```ts
// path, schema를 제외한 모든 입력 필드는 옵셔널입니다.
const data = await client.post({
  path: '...',
  schema: ...,
  query?: { ... },
  body?: ...,
  init?: { ... },
  timeoutMs?: ...,
  retryConfig?: { ... },
})

//이미지 업로드
const form = new FormData();
form.append('image', file);

//이름은 응답마다 다름
const { url } = await client.upload({
  path: '/images/upload',
  body: form,
  schema: uploadResSchema,
});

```

`del`

```ts
// delete는 반환값이 없습니다
await client.del({
  path: '...',
  init?: { ... },
  timeoutMs?: ...,
  retryConfig?: { ... },
})
```

표준예제에서 볼 수 있듯 BFF(App routes)에서 다음과 같이 에러를 핸들링 합니다.

```ts
export async function GET() {
  try {
    return Response.json({ ok: true });
  } catch (e) {
    return respondError(toApiError(e));
  }
}
```

이렇게 되면 클라이언트에서 잡은 에러는 ApiError로 정규화된 형태입니다.

```ts
try {
  const data = await client.get(...);
} catch (e) {
  isApiError(e) // true
  e.name === "ApiError" // true
  e.status // 상태 코드
  e.code // 에러 코드
  e.message // 에러 메세지
  e?.details // meta, fieldError 등
}
```
