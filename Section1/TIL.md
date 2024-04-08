# 1. Welcome, Welcome, Welcome

### 변수 생성

```
const [advice, setAdvice] = useState("");
const [count, setCount] = useState(0);
```

*advice*는 변수명이 되고, *setAdvice*는 변수의 값을 변경할 때 쓰는 함수가 된다.

### 변수 값 재할당

```
setAdvice(data.slip.advice);
setCount((c) => c + 1);
```

값을 할당할 때는 새로운 값으로 초기화 하거나, 기존 값에서 연산을 하는 식으로 재할당 할 수 있다.
