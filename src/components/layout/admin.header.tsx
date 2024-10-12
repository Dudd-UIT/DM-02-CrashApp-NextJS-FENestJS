'use client';

import { Layout, theme } from 'antd';

const { Header } = Layout;
const AdminHeader = (props: any) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }} />
    </>
  );
};

export default AdminHeader;
