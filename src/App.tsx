import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { AnimatePresence, backInOut, motion } from 'framer-motion';
import Animation from './Box/Animation';
import Variants from './Box/Variants';
import Gestures from './Box/Gestures';
import Dragging from './Box/Dragging';
import Scroll from './Box/Scroll';
import Path from './Box/Path';
import Presence from './Box/Presence';

interface IContainer {
  bg: string;
}

const AniPresence = styled.div`
  background-color: #000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  > section {
    position: absolute;
    top: 40%;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #07031b, #150117);
  flex-wrap: wrap;
  padding: 2vw 0;
  gap: 2vw;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  gap: 0;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  height: 400px;
  gap: 10px;
  div:first-child {
    grid-column: span 2;
  }
  div:last-child {
    grid-column: span 2;
  }
`;

const El = styled(motion.div)`
  background-color: #fff;
  border-radius: 12px;
  height: 200px;
`;

const Container = styled.div<IContainer>`
  overflow: hidden;
  background: linear-gradient(${({ bg }) => bg});
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 500px;
  height: 500px;
  display: flex;
`;

const CircCont = styled(motion.div)`
  width: 400px;
  height: 400px;
  display: flex;
  background-color: #000;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: #fff;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px;
  font-size: 28px;
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 100%;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

function App() {
  const [visible, setVisible] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [back, setBack] = useState({ val: false });
  const [id, setId] = useState<null | String>(null);

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
  return (
    <>
      <Wrapper>
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
      </Wrapper>
      <Wrapper>
        <CircCont>{!clicked ? <Circle layoutId="cir" /> : null}</CircCont>
        <CircCont>{clicked ? <Circle layoutId="cir" /> : null}</CircCont>
        {/* <button onClick={toggleClick}>toggle</button> */}
        <AniPresence>
          <AnimatePresence>
            <Box
              key={visible}
              custom={back.val}
              variants={boxVar}
              initial="entry"
              animate="center"
              exit="exit"
            >
              {visible}
            </Box>
          </AnimatePresence>
          <section>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button>
          </section>
        </AniPresence>
      </Wrapper>
      <Wrapper>
        <Container bg="135deg, #e09, #d0e">
          <Animation />
        </Container>
        <Container bg="180deg, #d0e, #91f">
          <Variants />
        </Container>
        <Container bg="180deg, #91f, #70f">
          <Gestures />
        </Container>
        <Container bg="180deg, #70f, #40f">
          <Dragging />
        </Container>
        <Container bg="180deg, #40f, #05f">
          <Scroll />
        </Container>
        <Container bg="180deg, #05f, #09f">
          <Path />
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
