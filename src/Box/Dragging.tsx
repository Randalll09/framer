import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const Cont = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background: #fff;
`;

const Dragging = () => {
  const contRef = useRef<HTMLDivElement>(null);
  return (
    <Cont ref={contRef}>
      <Box
        drag
        dragSnapToOrigin
        whileDrag={{ backgroundColor: '#fff' }}
        dragConstraints={contRef}
        dragElastic={1}
      ></Box>
    </Cont>
  );
};

export default Dragging;
