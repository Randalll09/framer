import styled from 'styled-components';
import { motion } from 'framer-motion';
import Animation from './Box/Animation';
import Variants from './Box/Variants';
import Gestures from './Box/Gestures';
import Dragging from './Box/Dragging';
import Scroll from './Box/Scroll';
import Path from './Box/Path';

interface IContainer {
  bg: string;
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #07031b, #150117);
  flex-wrap: wrap;
  padding: 2vw 0;
  gap: 2vw;
  justify-content: center;
  overflow: hidden;
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

function App() {
  return (
    <>
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
