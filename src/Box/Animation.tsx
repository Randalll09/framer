import styled from 'styled-components';
import { motion } from 'framer-motion';

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Animation = () => {
  return (
    <Box
      transition={{ type: 'spring', delay: 1 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotateZ: 360 }}
    />
  );
};
export default Animation;
