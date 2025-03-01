// 엄격한 경고, 버그 잡아주는거
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 전역 css
import './index.css'
import App from './App.tsx'

// 리액트는 가상 dom을 통해 화면 업데이트를 관리 -> 결과물 렌더링
/*

document.getElementById('root')! : root라는 ID를 가진 HTML 요소를 가져온다.
!는 TypeScript에게 “이건 null이 아니라고 확신한다”고 알려주는 문법.

“root라는 HTML 요소를 가져와서, 그 안을 React 애플리케이션으로 사용하겠다.”
라는 의미

*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
