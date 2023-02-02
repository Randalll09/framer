# 8 ANIMATIONS

[https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=TW-WW-All-GS-UA-Traffic-20190326-Brand.Bmm_]

## 8.0 Introduction

App 파일에 베이스를 깔아주자.

```JavaScript
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;

```

## 8.1 Installation

npm i framer-motion으로 설치하고 {motion}을 import 하자.
motion을 사용하려면 motion.div를 써주면 된다.

```JavaScript
      <motion.div></motion.div>

```

평범한 html태그와 같지만 앞에 motion.을 붙여주면 된다.

## 8.2 Basic Animations

스타일 컴포넌트에 framer-motion을 사용해보자.

```JavaScript
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
```

첫 prop을 넣어주자.

```JavaScript
      <Box animate={{ borderRadius: '100px' }} />
```

그다음에는 transition을 넣어주자.

```JavaScript
      <Box transition={{ duration: 3 }} animate={{ borderRadius: '100px' }} />
```

demo 에서 보이는 걸 만들어보자.

시작 값은 initial prop으로 설정하면 된다. transition에 타입을 정할 수도 있는데 tween이 linear라고 생각하면 된다.

```JavaScript
      <Box
        transition={{ type: 'spring' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
```

spring 자체를 modify 할수도 있다.

```JavaScript
        transition={{ type: 'spring', stiffness: 10, damping: 1 }}
```

spring은 물리현상 자체를 렌더링한다.

## 8.3 Variants part One

variants는 코드를 정리해줄수 있다. variants는 기본적으로 애니메이션을 위한 단계이다.

```JavaScript
const myVars = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    rotateZ: 360,
  },
  transition: {
    type: 'spring',
    delay: 1,
  },
};
.
.
.
        <Box
          transition={myVars.transition}
          initial={myVars.start}
          animate={myVars.end}
        />
```

혹은 아래처럼 써줄 수도 있다.

```JavaScript
const myVars = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: {
      type: 'spring',
      delay: 1,
    },
  },
};
.
.
.
        <Box variants={myVars} initial="start" animate="end" />

```

## 8.4 Variants part Two

해야 할일은 박스가 먼저 나타난 뒤 자식 요소들이 나타나게 하면 된다.

```JavaScript
    <Box variants={contVar} initial="start" animate="end">
      <Circle />
      <Circle />
      <Circle />
      <Circle />
    </Box>
```

기본적으로 어떠한 설정도 없을때, 부모 컴포넌트가 variants와 initial의 이름, animate의 이름을 갖고 있으면 motion은 자동적으로 initial과 animate의 이름을 복사해 자식들에게 건네준다.

circleVar를 생성해보자.

```JavaScript
const circleVar = {
  start: {
    scale: 0,
    opacity: 0,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 2,
      bounce: 0.5,
      delay: 2,
    },
  },
};
.
.
.
    <Box variants={contVar} initial="start" animate="end">
      <Circle variants={circleVar} />
      <Circle variants={circleVar} />
      <Circle variants={circleVar} />
      <Circle variants={circleVar} />
    </Box>
```

위와 같이 initial과 animate에 동일한 이름을 사용하기만 하면 자식 컴포넌트에게 일일히 prop을 전달치 않아도 된다.

예제를 보면 원이 차례대로 나타나는 걸 볼수 있다.

[https://www.framer.com/motion/transition/#orchestration] 링크에 가면 delayChildren이란 property를 transition에 넣을수 있다.

delayChildren을 부모요소에 줄 variants의 transition항목에 넣으면 그만큼 자식요소의 애니메이션을 delay한다. 또한 staggerChildren이라는 항목도 있다.

staggerChildren을 사용하면 차례차례 나타나게 할수 있다.

```JavaScript

const contVar = {
  start: {
    scale: 0.5,
    opacity: 0,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
      type: 'spring',
      duration: 1,
      bounce: 0.5,
    },
  },
};
```

framer motion은 대부분 css를 사용해서 애니메이팅한다. css property의 대부분을 애니메이팅 할수 있는 것이다.
