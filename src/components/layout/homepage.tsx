'use client';

import { CrownOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const HomePage = () => {
  return (
    <div style={{ padding: 20 }}>
      <Result icon={<CrownOutlined />} title="Demo 02 Fullstack Next/Nest" />
    </div>
  );
};

export default HomePage;
