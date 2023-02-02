import { motion } from 'framer-motion';
import styled from 'styled-components';

const Box = styled(motion.div)``;

const Svg = styled.svg`
  height: 120px;
  path {
    stroke: #fff;
    stroke-width: 2;
  }
`;

const Path = () => {
  return (
    <Box>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <motion.path
          initial={{ fill: 'rgba(255,255,255,0)', pathLength: 0 }}
          animate={{ fill: 'rgba(255,255,255,1)', pathLength: 1 }}
          transition={{
            default: { duration: 5 },
            fill: { duration: 2, delay: 1 },
            pathLength: { duration: 1 },
          }}
          d="M291.2 388.4c31.2-18.8 64.7-36.4 101.1-36.4H448c4.6 0 9.1-.2 13.6-.7l85.3 121.9c4 5.7 11.3 8.2 17.9 6.1s11.2-8.3 11.2-15.3V224c0-70.7-57.3-128-128-128H392.3c-36.4 0-69.9-17.6-101.1-36.4C262.3 42.1 228.3 32 192 32C86 32 0 118 0 224c0 71.1 38.6 133.1 96 166.3V456c0 13.3 10.7 24 24 24s24-10.7 24-24V410c15.3 3.9 31.4 6 48 6c5.4 0 10.7-.2 16-.7V456c0 13.3 10.7 24 24 24s24-10.7 24-24V405.1c12.4-4.4 24.2-10 35.2-16.7zM448 248c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"
        />
      </Svg>
    </Box>
  );
};

export default Path;
