## useLocalization.ts

이 파일은 프로젝트에서 다국어 지원을 하기 위한 hooks 입니다.

```typescript
/**
 * @remarks
 * 이 함수는 "useLocalization"이라는 React 훅으로,
 * 언어 설정에 따른 텍스트 데이터를 관리하는 기능을 제공합니다.
 * ko (Korean) 또는 en (English)을 입력으로 받아 해당 언어의 텍스트 데이터를 반환합니다.
 * 기본값으로 en (English)이 설정되어 있습니다.
 *
 * @params langs - 'ko' | 'en' 중 하나의 값을 입력으로 받습니다.
 *
 * @returns Localization - 언어 설정에 따른 텍스트 데이터
 *
 */

export function useLocalization(langs: 'ko' | 'en' = 'en'): Localization {
    const texts = useMemo(() => {
        const data = require(`../utils/locales/${langs}.json`) as Localization
        return data
    }, [langs])

    return texts
}
```
