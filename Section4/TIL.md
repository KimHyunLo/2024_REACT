# Review of Esssential Javascript for React

## 구조 분해 할당

_Object_ 타입의 변수에서 원하는 *value*만 가져올 때 *key*값을 대조하여 새로운 변수에 할당할 수 있다.  
이 방식으로 한 번의 구조 분해로 여러 변수를 생성할 수 있다.

```
일반 선택 : const title = book.title;
key값으로 선택 : const { title } = book;
```

_Array_ 타입의 변수 또한 배열의 순서에 따라 변수를 여러 개 동시에 생성할 수 있다.

```
일반 선택 : const primaryGenre = genres[0];
순서대로 선택 : const [primaryGenre, secondaryGenre] = genres;
```

## Rest/Spread 연산자

구조 분해 할당으로 변수를 생성할 때 선택한 값 외의 나머지 변수들을 하나의 변수로 다시 생성할 수 있다.

```
Object : const { genres, ...otherBookInfo } = book;
Array : const [primaryGenre, ...otherGenres] = genres;
```

반대로 _Object_ 타입이나 _Array_ 타입의 변수를 재할당 할 때 전체 값을 풀어서 재할당할 수 있다.

```
Array : const newGenres = [...genres, "epic fantasy"];
Object : const updatedBook = {
  ...book,
  moviePublicationDate: "2000-10-10",
  pages: 1210,
};
```

_Object_ 타입의 경우 중복되는 _key_ 값은 나중에 생성된 _key_ 값의 *value*를 덮어쓰는 방식으로 할당된다.

## 템플릿 리터럴

문자열을 ` 특수문자로 통해 선언할 경우 내부에 변수를 활용할 수 있다.

```
const summary = `${title}, a ${pages}-page long book, was written by ${author}`;
```

## 삼항연산자

_If-Else_ 로만 끝나는 조건문을 삼항연산으로 표현하면 더 간략하게 표현할 수 있다.  
삼항연산자의 값은 조건이 참일 경우 : 앞의 값을 반환하고, 거짓일 경우 : 뒤의 값을 반환한다.

```
const pagesRange = pages > 1000 ? "over a thousand" : "less than a thousand";
```

## 화살표 함수

한 줄짜리의 간단한 함수는 화살표 함수를 통해서 생성할 경우 더 간략하게 표현할 수 있다.  
한 줄이 아니어도 괄호를 생성하여 반환할 값을 _return_ 명령어를 통해 반환하는 식으로도 사용할 수 있다.

```
const getYear = (str) => str.split('-')[0];
```

## 논리 연산자

논리 연산자는 연산자의 앞에 있는 변수가 어떤 값을 가리키는지에 따라 반환할 함수를 선택한다.  
변수는 값에 따라 참 또는 거짓을 표현할 수 있다.  
거짓을 표현하는 변수는 다음과 같다: '', 0, null, undefined, false  
참을 표현하는 변수는 거짓 외의 모든 값을 포함한다.

_&&_ 연산자는 앞의 변수가 참일 때만 뒤의 변수를 반환한다.

```
console.log("jonas" && "Some String"); => Some String
console.log(0 && "Some String"); => 0
```

_||_ 연산자는 앞의 변수가 거짓일 때만 뒤의 변수를 반환한다.

```
console.log("jonas" || "Some String"); => jonas
console.log(0 || "Some String"); => Some String
```

_??_ 연산자는 앞의 변수가 _null_ 또는 _undefined_ 값일 때만 뒤의 변수를 반환한다.

```
console.log(null ?? "Some String"); => Some String
console.log(0 ?? "Some String"); => 0
```

## 옵션 체이닝

Object 변수의 내부에서 값을 선택할 때 해당 키 값이 존재하지 않을 수도 있다.  
이런 경우 생각치 못한 에러를 발생시킬 수 있다.

원치 않은 에러를 막기 위해 옵션 체이닝을 걸어 사전에 undefined를 처리할 수 있다.

```
const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
```

옵션 체이닝은 선택한 key 값이 존재하지 않을 경우 에러를 발생시키지 않고 undefined를 반환한다.  
변수가 undefined가 될 경우를 생각해서 미리 논리 연산자를 쓸 수도 있다.

## map 메서드

_map_ 메서드는 기존 배열을 순회하면서 새로운 배열을 생성하는 메서드다.  
_map_ 메서드는 무조건 조회하는 배열과 같은 크기의 배열을 생성한다.

```
const x = [1, 2, 3, 4, 5].map((el) => el * 2);
// [2, 4, 6, 8, 10]
```

## filter 메서드

_filter_ 메서드는 기존 배열을 순회하면서 반환값이 참일 경우에만 변수를 반환하는 메서드다.

```
const longBooks = books.filter((book) => book.pages > 500);
```

## reduce 메서드

_reduce_ 메서드는 기존 배열을 순회하면서 반환된 값을 다음 함수에게 넘기는 식으로 동작하는 메서드다.  
최종적으로 반환하는 변수는 어떤 타입일 수도 있으며 반복문을 돌면서 값이 계속 바뀔 수 있다.

```
const pagesAllBoks = books.reduce((acc, book) => acc + book.pages, 0);
```

## sort 메서드

_sort_ 메서드는 기존 배열을 순회하면서 반환된 값이 음수인지, 양수인지에 따라 배열을 재정렬하는 메서드다.  
음수로 반환된 값은 내림차순으로 정렬되고, 양수로 반환된 값은 오름차순으로 정렬된다.

```
const sorted = x.slice().sort((a, b) => a - b);
```

다를 반복문 메서드와 다르게 sort 메서드는 기존 배열의 값 또한 재할당하기 때문에  
사용하기에 앞서 기존 배열을 새 배열로 옮길 필요가 있을 수 있다.

## 비동기 통신 Promise

_Promise_ 는 비동기 통신으로 API나 시간이 걸리는 함수를 이용할 때 사용된다.  
_Promise_ 는 통신이 완료되면 콜백함수를 통해 값을 반환하는 식으로 동작한다.

```
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));

```

## 비동기 통신 Async/Await

_Async/Await_ 는 비동기 통신으로 API나 시간이 걸리는 함수를 이용할 때 사용된다.  
_Promise_ 와 달리 _Async/Await_ 는 데이터가 반환될 때까지 다음 줄의 코드를 실행하지 않고 기다리게 된다.

또한 반환된 데이터는 변수에 할당할 수 있으며 다양한 방식으로 활용할 수 있다.

```
async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);
}

getTodos();
```
