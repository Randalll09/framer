import styled from 'styled-components';
import { motion } from 'framer-motion';

const Div = styled(motion.div)`
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export default Presence;
