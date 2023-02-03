# ANIMATION

## 8.11 AnimatePresence

AnimatePresence는 코션 요소가 사라질때 애니메이팅 하는 것을 의미한다.

state에 따라 나타나고 사라지는 팝업창을 하나 만들자.

AnimatePresence의 규칙은, AnimatePresence는 visible 상태여야 하고 그 자식요소는 보일지 보이지 않을지 선택문이 있어야한다.

```JavaScript
        <AnimatePresence>{show ? <Presence /> : null}</AnimatePresence>

```

이제 variant로 애니메이팅 요소를 넣어주자. exit은 해당 요소가 사라질 때 실행되는 애니메이션이다.

```JavaScript
const boxVar = {
  inital: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};

const Presence = () => {
  return (
    <Div
      variants={boxVar}
      initial="initial"
      exit="exit"
      animate="visible"
    ></Div>
  );
};

```

## 8.12 Slider part One

AnimatePresence로 슬라이더를 만들어보자.

```JavaScript
      <AniPresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <Box key={v}>{v}</Box>
        ))}
      </AniPresence>
```

한번에 한개의 박스만 보이게 해보자.

visible이란 state을 만들자. visible의 숫자인 요소만 보이게 해보자.

```JavaScript
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  return (
    <>
      <AniPresence>
        <AnimatePresence>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) =>
            v === visible ? <Box key={v}>{v}</Box> : null
          )}
        </AnimatePresence>
        <button onClick={nextPlease}>next</button>
      </AniPresence>
```

이제 variants를 만들어보자.

```JavaScript
const boxVar = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
  },
};
.
.
      <AniPresence>
        <AnimatePresence>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) =>
            v === visible ? (
              <Box
                key={v}
                variants={boxVar}
                initial="invisible"
                animate="visible"
                exit="exit"
              >
                {v}
              </Box>
            ) : null
          )}
        </AnimatePresence>
        <button onClick={nextPlease}>next</button>
      </AniPresence>
```

이제 버튼을 누르면 이동하면서 슬라이딩이 된다. 박스가 위아래나 옆으로 움직이는데 이는 box에 absolute 값을 주면 해결된다.

뒤로 가는 버튼도 만들어보자.

```JavaScript
  const prevPlease = () => setVisible((prev) => (prev === 1 ? 10 : prev - 1));

```

하지만 앞으로가나 뒤로가나 애니메이션은 동일하다.

## 8.13 Slider part Two

슬라이더에 방향을 만들어보자. 그전에 슬라이더를 조금 고치자. 우리는 숫자로 된 visible을 가지고 있다. visible을 Box의 key로 넣으면 리액트는 visible이 변경될때마다 새로운 요소가 생겼다고 판단한다.

```JavaScript
        <AnimatePresence>
          <Box
            key={visible}
            variants={boxVar}
            initial="invisible"
            animate="visible"
            exit="exit"
          >
            {visible}
          </Box>
        </AnimatePresence>
```

위와 같이해도 슬라이더가 매번 움직인다.

슬라이더의 방향을 바꾸기 위해 custom이란 property에 대해 알아보자. custom은 variants에 데이터를 보낼수 있게 해주는 property이다. 우선 Box에 보내는 prop 값의 명칭을 바꿔주자.

```JavaScript
const boxVar = {
  entry: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
  },
};
.
.
.
    <Box
            key={visible}
            variants={boxVar}
            initial="entry"
            animate="center"
            exit="exit"
          >
```

슬라이더의 방향에 따라 entry와 exit의 위치가 바뀌어야 한다. custom에는 뭐든지 넣어줄수 있다.

```JavaScript
          <Box
            key={visible}
            custom={0}
            variants={boxVar}
            initial="entry"
            animate="center"
            exit="exit"
          >
```

variant는 원래 object지만 custom을 쓰기위해선 function으로 바뀌어야 한다. 우선 방향을 지정할 state을 만들자.

```JavaScript
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  };
```

이제 variants를 함수로 바꿔주자.

```JavaScript
const boxVar = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (back: boolean) => {
    return {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
    };
  },
};
.
.
.
          <Box
            key={visible}
            custom={backInOut}
            variants={boxVar}
            initial="entry"
            animate="center"
            exit="exit"
          >
            {visible}
          </Box>
```

이제 entry와 exit은 둘다 함수이다. custom에 넣은 값은 이제 variant의 arg로 사용된다.

이렇게 하면 애니메이션이 한단계 전으로 적용되는 문제가 있어 코드를 수정했다. back을 오브젝트로 설정한다. setState에선 오브젝트값일때, 같은 값이 설정되더라도 값이 바뀌었다고 인식한다.

```JavaScript
  const [back, setBack] = useState({val:false});

```

그리고 useEffect로 back이 바뀔때마다 visible을 바꿔준다.

```JavaScript
  const nextPlease = () => {
    setBack({ val: false });
  };
  const prevPlease = () => {
    setBack({ val: true });
  };
  useEffect(
    () =>
      back.val
        ? setVisible((prev) => (prev === 1 ? 10 : prev - 1))
        : setVisible((prev) => (prev === 10 ? 1 : prev + 1)),
    [back]
  );
```

추가로, 만약 enter와 exit이 동시에 실행되지 않길 원한다면 AnimatePresence에 mode="wait"을 추가해주면 된다.

```JavaScript
        <AnimatePresence mode="">
```

## 8.14 You Need to Watch This

layout 요소에 대해 알아보자. layout는 css요소 등의 외부요소에 의해 layout이 변경되면 애니메이팅을 주는 prop이다.

```JavaScript
      <CircCont
        style={{
          justifyContent: clicked ? 'center' : 'flex-start',
          alignItems: clicked ? 'center' : 'flex-start',
        }}
      >
        <Circle layout />
      </CircCont>
      <button onClick={toggleClick}>toggle</button>
```

또한 shared layout animation도 있다.

```JavaScript
      <CircCont>{!clicked ? <Circle /> : null}</CircCont>
      <CircCont>{clicked ? <Circle /> : null}</CircCont>
```

위와 같이 하면 clicked 에 따라 하나의 원만 렌더링 된다.

현재 우리는 각각 다른 2개의 요소를 보여주거나 숨기고 있다. 이제 framer motion에게 두 원은 사용자의 눈에 똑같이 보여야 한다고 하자. 이건 layoutId 라는 prop 으로 알릴수 있다.

```JavaScript
      <CircCont>{!clicked ? <Circle layoutId="cir" /> : null}</CircCont>
      <CircCont>{clicked ? <Circle layoutId="cir" /> : null}</CircCont>
```

위와 같이 같은 layoutId를 주면 토글될때마다 원이 이동한다. 둘중 하나의 원에는 다른 모양을 줘도, Circle 컴포넌트는 이동하면서 변형 애니메이션을 보여준다.

## 8.15 Final Project part One

네개의 박스를 만들고 클릭하면 중앙으로 이동하게 하자.

```JavaScript
      <Wrapper onClick={() => setOverlay((prev) => !prev)}>
        <Grid>
          <El />
          <El />
          <El />
          <El />
        </Grid>
        {overlay ? <Overlay></Overlay> : null}
      </Wrapper>
```

overlay에 AnimatePresence를 넣고 애니메이팅도 넣자.

```JavaScript
        <Grid>
          <El />
          <El />
          <El />
          <El />
        </Grid>
        <AnimatePresence>
          {overlay ? (
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <El style={{ width: 500, height: 200 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
```

지금 overlay 안의 el과 그밖의 el은 서로 각각 다른 요소이다. layoutId를 줘보자.

```JavaScript
   <Grid>
          <El layoutId="1" />
          <El />
          <El />
          <El />
        </Grid>
        <AnimatePresence>
          {overlay ? (
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <El layoutId="1" style={{ width: 500, height: 200 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
```

이제 클릭하면 첫번쨰박스가 overlay에 뜨는 것같아 보인다.

## 8.16 Final Project part Two

이제 다른 박스도 클릭하게 해보자.

```JavaScript
  const [id, setId] = useState<null | String>(null);
.
.
.
        <Grid>
          {[1, 2, 3, 4].map((n) => (
            <El key={n} onClick={() => setId(n + '')} layoutId={n + ''} />
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            >
              <El
                layoutId={id + ''}
                onClick={() => setId(null)}
                style={{ width: 500, height: 200 }}
              />
            </Overlay>
          ) : null}
        </AnimatePresence>
```
