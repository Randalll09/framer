import styled from 'styled-components';
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';

const Cont = styled(motion.div)`
  width: 100%;
  height: 100vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background: #fff;
`;

const Scroll = () => {
  const x = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [2, 0.5]);
  const rotateZ = useTransform(x, [-300, 0, 300], [360, 0, -360]);
  const bg = useTransform(
    x,
    [-300, 0, 300],
    [
      'linear-gradient(135deg,#57c210,#10c236,#1090c2)',
      'linear-gradient(180deg,#10c260,#1048c2,#c210bc)',
      'linear-gradient(235deg,#103cc2,#b310c2,#c21072)',
    ]
  );
  return (
    <>
      <Cont style={{ background: bg }}>
        <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin></Box>
      </Cont>
    </>
  );
};

export default Scroll;
