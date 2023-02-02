import styled from 'styled-components';
import { motion } from 'framer-motion';

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: none;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
`;

const Circle = styled(motion.div)`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 100%;
  background-color: white;
  height: 70px;
  width: 70px;
`;

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
const circleVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 2,
      bounce: 0.5,
    },
  },
};

const Variants = () => {
  return (
    <Box variants={contVar} initial="start" animate="end">
      <Circle variants={circleVar} />
      <Circle variants={circleVar} />
      <Circle variants={circleVar} />
      <Circle variants={circleVar} />
    </Box>
  );
};

export default Variants;
