# useUploadImageToUrl 사용법

## 입력 필드

```ts
// useUploadImageToUrl
type field = {
  type: 'profile' | 'activity';
  options: {
    onSuccess?: (url: string) => void;
    onError?: (error: ApiError) => void;
  };
};

// mutate
type field = {
  file: File;
  options?: {
    // 원하는 옵션 설정
  };
};
```

## 간단 사용법

```ts
const { mutate, isPending } = useUploadImageToUrl(type, {
    onSuccess: (url) => {
      // 성공시 행동 로직
    },
    onError: (e) => {
      // 에러 핸들링 로직
    },
  }
);


mutate(file, { onSettled: ... }) // onSettled는 예시
// 첫번째 인자는 이미지, 두번째는 자유롭게 사용
```
