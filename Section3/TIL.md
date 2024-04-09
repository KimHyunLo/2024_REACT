# A First Look at React

## React 렌더링

React는 VirtualDOM 방식으로 화면을 출력하는 JS 라이브러리다.  
SPA 형식의 렌더링으로 로딩 없이 UI를 바꿀 수 있다는 장점이 있다.

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
```

React의 렌더링 방식은 html 파일에서 하나의 요소를 선택하고,  
선택한 요소의 자식으로 컴포넌트를 추가하는 방식으로 출력된다.

## 프로젝트 생성

React 프로젝트를 생성하는 가장 흔한 방식은 _CREATE-REACT-APP_ 이다.  
하지만 기술이 노후화되면서 초급자용으로만 사용되고 있다.

최신 프로젝트는 _VITE_ 를 사용하여 프로젝트를 생성하고 있다.  
Vite는 최신 빌드 툴을 사용하며, 번들링과 HMR에서 빠른 속도를 보여준다.
