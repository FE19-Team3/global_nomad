아래 내용에 컴포넌트 코드를 추가해 ai에게 입력하여 스토리를 생성합니다.

```
# Storybook 스토리 파일 자동 생성 조건

## 기본 설정

1. 들여쓰기 기준은 4칸으로 할 것.
2. Storybook 10+ 문법으로 작성할 것.
3. 반드시 `Meta`, `StoryObj` 타입을 사용할 것.
4. 이 때 `Meta`, `StoryObj`는 `@storybook/react` 가 아닌 `@storybook/nextjs-vite`에서 불러올 것.
5. meta를 선언할 때 `const meta = {...} satisfy Meta<typeof comp>` 방식으로 할 것
6. meta에는 `tags: ['autodocs']`를 포함할 것.

## Import 규칙

1. 컴포넌트 파일(`COMPONENT`, `COMPONENT_PROPS`(필요한 경우))만 import 할 것.
2. `React`, `useState`를 사용하는 경우에만 import 할 것.
3. `useState`는 제어 컴포넌트(value prop + onChage/onValueChange 등의 핸들러가 있는 경우)에만 import 할 것.
4. 컴포넌트의 Props 타입이 export되어 있고, 명시적으로 필요한 경우 import 할 것.

## Meta 설정

1. `title`은 `Components/[컴포넌트명]` 형식으로 지정할 것.
2. `component`는 반드시 해당 컴포넌트 이름으로 지정할 것.

## ArgTypes 설정

1. `argTypes`에는 컴포넌트에 명시된 모든 props를 포함할 것.
2. 각 prop에 `description`을 포함하지 말 것.
3.  `control` 타입은 다음 규칙으로 자동 설정:
- `string`: `{ type: 'text' }`
- `number`: `{ type: 'number' }`
- `boolean`: `{ type: 'boolean' }`
- `union type (literal)`: `{ type: 'inline-radio', options: [...] }`
- `function`: 작성하지 않음 (action만 지정)
- `ReactNode`: `{ type: 'text' }` (단순 텍스트로 입력받음)
- `object/array`: 타입이 복잡한 경우 control 생략 가능
4. 함수형 props(`onClick`, `onChange`, `onValueChange` 등)가 있는 경우:
- `action: "함수명 called"` 형식으로 지정할 것.
- `action()` 함수는 사용하지 않고 문자열로만 지정할 것.
5. `options` 속성은 작성하지 말 것.
6. `radio` 가 아닌 `inline-radio`로 구현할 것

## Args 설정

1. `args`에는 모든 props의 기본값을 포함할 것.
2. 기본값 설정 규칙:
    - `string`: 의미 있는 샘플 텍스트
    - `number`: 타입에 맞는 적절한 숫자 (size면 중간값, count면 1 등)
    - `ReactNode`: 간단한 텍스트 또는 이모지
    - `function`: 절대 포함하지 않음 (action으로만 처리)
    - 선택적 props: 합리적인 기본값 제공
3. **render 함수를 사용하는 경우, 해당 props는 args에서 제거할 것.**

## Story 정의

1. 스토리는 `Default` 하나만 생성할 것.
2. `render` 함수 사용 기준
    - **제어 컴포넌트** (`value` + `onChange`/`onValueChange` 등): 반드시 `render` 사용, `useState`로 상태 관리
    - **children을 JSX로 구성해야 하는 경우**: `render` 사용
    - **복잡한 prop 조합이 필요한 경우**: `render` 사용
    - **그 외 단순 props만 있는 경우**: `render` 생략
3. `render` 함수 내에서 `useState`를 사용하는 경우:
    - 상태를 관리하는 props(`value`, `checked` 등)는 내부 state로 처리
    - 해당 props는 args에 포함하지 않음
    - 핸들러(`onChange` 등)는 state 업데이트 + `args.핸들러명?.()` 호출
4. `render` 함수에서 관리하지 않는 props는 `{...args}`로 전달할 것.

## 타입 일관성

1. 문자열 타입 prop에는 절대 JSX를 넣지 말 것.
2. ReactNode 타입 prop에만 JSX, HTML 요소, 이모지 등을 사용할 것.
3. 컴포넌트의 타입 정의와 조건이 충돌하는 경우, 컴포넌트 타입 정의를 우선할 것.

## 예외 처리

- 컴포넌트 코드에서 props 타입을 추출할 수 없는 경우, 예측이 아닌 기본적인 스토리 구조만 생성할 것.
- 불명확한 타입/복잡한 구조는 주석으로 표시하고 기본값을 제공할 것.

## Export

- `export default meta;`로 meta를 export할 것.
- `export const Default: StoryObj<typeof 컴포넌트명> = {...};`형식으로 스토리를 export할 것.

## AI 답변 출력 형식

- 조건을 모두 충족하는 Storybook 스토리 파일 코드만 출력할 것.
- 불필요한 설명, 사과, 대체 예시는 절대 포함하지 말 것.
- 코드 블록으로 감싸서 출력할 것.

[컴포넌트 코드] :
```
