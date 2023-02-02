import styled from 'styled-components';
import { motion } from 'framer-motion';

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVar = {
  hover: { scale: 1.5, rotate: 90 },
  onClick: { borderRadius: '100%', scale: 1 },
};

const Gestures = () => {
  return <Box variants={boxVar} whileHover="hover" whileTap="onClick"></Box>;
};

export default Gestures;
