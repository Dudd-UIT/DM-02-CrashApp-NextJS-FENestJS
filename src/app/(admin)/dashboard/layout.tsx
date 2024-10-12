import React from 'react';
import { Layout, theme } from 'antd';
import AdminSideBar from '@/components/layout/admin.sidebar';
import AdminHeader from '@/components/layout/admin.header';
import AdminFooter from '@/components/layout/admin.footer';
import AdminContent from '@/components/layout/admin.content';

const { Content } = Layout;

const DashboardPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout>
      <AdminSideBar />
      <Layout>
        <AdminHeader />
        <AdminContent>{children}</AdminContent>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
