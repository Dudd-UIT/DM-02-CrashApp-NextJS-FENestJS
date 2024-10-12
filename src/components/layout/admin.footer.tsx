'use client';
import { Layout } from 'antd';

const AdminFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer style={{ textAlign: 'center' }}>
        Buoi ©{new Date().getFullYear()} Created by @mr.buoi
      </Footer>
    </>
  );
};

export default AdminFooter;
