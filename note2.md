# ANIMATIONS

## 8.5 Gestures part One

event를 들으려면 while이란 prop을 사용하면 된다. whileHover와 whileTab을 사용해보자.

```JavaScript
    <Box whileHover={{ scale: 2 }} whileTap={{ borderRadius: '100%' }}></Box>

```

이제 예제대로 만들어보자.

```JavaScript
    <Box
      whileHover={{ scale: 1.5, rotate: 90 }}
      whileTap={{ borderRadius: '100%', scale: 1 }}
    ></Box>
```

variants를 사용해보자.

```JavaScript
const boxVar = {
  hover: { scale: 1.5, rotate: 90 },
  onClick: { borderRadius: '100%', scale: 1 },
};

const Gestures = () => {
  return <Box variants={boxVar} whileHover="hover" whileTap="onClick"></Box>;
};
```

이제는 Dragging을 구현해볼것이다.

먼저 자유로운 드래그를 구현한뒤 제한있는 드래그를 구현하자.

자유로운 드래그는 아래와 같이 drag prop을 전해주기만 하면 된다.

```JavaScript
  return <Box drag></Box>;

```

whileDrag prop을 사용하면 드래그하는 중의 애니메이션을 넣을 수도 있다.

```JavaScript
  return <Box drag whileDrag={{ backgroundColor: '#fff' }}></Box>;

```

여기서 배경색은 숫자값으로 넣어줘야한다.

## 8.6 Gestures part Two

이제 제약있는 드래그를 구현해보자.

우선 드래그의 방향을 제한하자. 수평만 이동하고 싶으면 drag="x" 라고 prop을 전달하면 된다.

```JavaScript
  return <Box drag="x" whileDrag={{ backgroundColor: '#fff' }}></Box>;
```

드래그의 위치를 제한하기위해선 dragConstraints라는 prop을 전달하면 된다. dragConstraints 로는 드래그의 영역이 허용되는 박스를 하나 만들어준다.

```JavaScript
    <Box
      drag
      dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
      whileDrag={{ backgroundColor: '#fff' }}
    ></Box>
```

아래와 같이 dragConstraints를 주면 조금 이동하다 원점으로 돌아온다.

```JavaScript
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}

```

박스안에서만 이동하게 큰 박스를 지정해주자.

```JavaScript
    <Cont>
      <Box drag whileDrag={{ backgroundColor: '#fff' }}></Box>
    </Cont>
```

우선 Cont에 overflow:hidden을 주자. Cont가 제약하게 하는 방법은 두가지가 있는데, 밖에 박스와 안의 박스의 넓이를 빼서 dragConstraints를 정해주는 것이다.
이 대신 ref를 사용하자.

```JavaScript
const Dragging = () => {
  const contRef = useRef<HTMLDivElement>(null);
  return (
    <Cont ref={contRef}>
      <Box drag whileDrag={{ backgroundColor: '#fff' }}></Box>
    </Cont>
  );
};
```

이제 ref로 Cont를 선택할 수 있으니 Box의 dragConstraints에 지정해주면 된다. 그럼 아무리 드래그해도 다시 돌아온다. 이제 드래그 후에 다시 원점으로 돌아오게 하자. dragSnapToOrigin prop을 쓰면 된다.

```JavaScript
      <Box
        drag
        dragSnapToOrigin
        whileDrag={{ backgroundColor: '#fff' }}
        dragConstraints={contRef}
      ></Box>
```

마지막으로 dragElastic을 배우자. dragElastic이 1이면 drag 요소는 dragConstraints를 벗어나도 마우스 커서를 끝까지 따라오고, 0이면 완전히 같힌다.

## 8.7 MotionValues part One

motionValue는 motion요소의 값을 추적한다. drag의 motionValue 를 추적해보자.

```JavaScript
  const x = useMotionValue(0);
  return <Box style={{ x }} drag="x" dragSnapToOrigin></Box>;
```

이제 x는 드래그되는 x값을 추적한다.
하지만 드래그해도 x의 값은 콘솔에 뜨지 않는다. motionValue는 state가 아니기 때문에 reactRenderingCycle을 트리거하지 않는다. motionValue를 추적하기 위해선 아래와 같은 함수를 useEffect와 사용해야한다.

useMotionValue를 style에 넣어주면 움직일때마다 style이 업데이트되고, 그렇게 motionValue의 값을 볼수 있다.

x값을 변경시키는 버튼을 만들어보자.

```JavaScript
      <button onClick={() => x.set(60)}>setX</button>
      <Box style={{ x }} drag="x" dragSnapToOrigin></Box>
```

클릭하면 오른쪽으로 60픽셀 이동한다.

## 8.8 MotionValues part Two

사각형을 드래그 할수록 커지고 작아지게 해보자.

우리는 x값을 가져와 scale값으로 변형해야한다. 이를 위해서는 useTransform 훅을 사용하면 된다.

```JavaScript
  const scale=useTransform()

```

useTransform에 첫 인자로 들어가는 건 transform할 motionValue이다. 두번째인자는 array인데, 3개의 값이 필요하다. transform할 input 값의 range를 받아오는 것이다. 세번째는 output array인데 output의 range를 정해주면 된다.

```JavaScript
  const scale = useTransform(x, [-300, 0, 300], [2, 1, 0.5]);
  useEffect(() => {
    scale.onChange(() => console.log(scale.get()));
  }, [x]);
```

이제 useTransform 값을 style에 연결 시켜주자.

```JavaScript
      <Box style={{ x, scale }} drag="x" dragSnapToOrigin></Box>

```

## 8.9 MotionValues part Three

scale만 바꿀수 있는데 아니라, 배경색등의 property도 바꿔줄수 있다. 드래그 정도에 따라 rotate 시켜보자.

```JavaScript
  const scale = useTransform(x, [-300, 0, 300], [360, 0, -360]);
.
.
      <Box style={{ x, rotateZ: scale }} drag="x" dragSnapToOrigin></Box>

```

컨테이너를 만들어 배경색도 바꿔보자.

```JavaScript
const Scroll = () => {
  const x = useMotionValue(0);
  const scale = useTransform(
    x,
    [-300, 0, 300],
    [
      'linear-gradient(135deg,#57c210,#10c236,#1090c2)',
      'linear-gradient(180deg,#c2a410,#1048c2,#c210bc)',
      'linear-gradient(235deg,#103cc2,#b310c2,#c21072)',
    ]
  );
  useEffect(() => {
    scale.onChange(() => console.log(scale.get()));
  }, [x]);
  console.log(x);
  return (
    <>
      <Cont style={{ background: scale }}>
        <Box style={{ x }} drag="x" dragSnapToOrigin></Box>
      </Cont>
    </>
  );
};

```

여기서 Cont는 단순한 styled.div가 아닌 styled(motion.div)로 줘야한다는 점을 유의하자.

두가지 useTransform을 하나의 motionValue에 줄수도 있다.

```JavaScript
const Scroll = () => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-300, 0, 300], [360, 0, -360]);
  const bg = useTransform(
    x,
    [-300, 0, 300],
    [
      'linear-gradient(135deg,#57c210,#10c236,#1090c2)',
      'linear-gradient(180deg,#c2a410,#1048c2,#c210bc)',
      'linear-gradient(235deg,#103cc2,#b310c2,#c21072)',
    ]
  );
  return (
    <>
      <Cont style={{ background: bg }}>
        <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin></Box>
      </Cont>
    </>
  );
};
```

이제 스크롤을 사용해 요소를 애니메이트 하는 방법을 알아보자. useScroll이란 함수를 이용하면 motionValue를 전달받을 수 있다.

```JavaScript
  const { scrollYProgress } = useScroll();

```

scrollYProgress는 0에서 1사이의 값을 주고 scrollY는 절대 스크롤 픽셀값을 준다.

```JavaScript
  const scale = useTransform(scrollYProgress, [0, 1], [2, 0.5]);
  .
  .
  .
        <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin></Box>

```

## 8.10 SVG Animation

fontawsome에 들어가 svg 아이콘을 하나 들고오자.

우선 fill의 opacity를 애니메이팅하자.

```JavaScript
  <motion.path
          initial={{ fill: 'rgba(255,255,255,0)' }}
          animate={{ fill: 'rgba(255,255,255,1)' }}
```

그 다음은 pathLength를 수정하자.

```JavaScript
        <motion.path
          initial={{ fill: 'rgba(255,255,255,0)', pathLength: 0.2 }}
          animate={{ fill: 'rgba(255,255,255,1)', pathLength: 1 }}
```

pathLength를 주면 서서히 그려지는 path를 볼수 있다.
이번엔 property 마다 다른 duration 값을 줘보자.

```JavaScript
        <motion.path
          initial={{ fill: 'rgba(255,255,255,0)', pathLength: 0 }}
          animate={{ fill: 'rgba(255,255,255,1)', pathLength: 1 }}
          transition={{
            default: { duration: 5 },
            fill: { duration: 2, delay: 1 },
            pathLength: { duration: 1 },
          }}
```

default는 모든 property에 적용되는 값이다.
