'use client';

import { sendRequest } from '@/utils/api';
import { useHasMounted } from '@/utils/customHook';
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, notification, Steps } from 'antd';
import email from 'next-auth/providers/email';
import { useState, useEffect } from 'react';

const ModalActivate = (props: any) => {
  const hasMounted = useHasMounted();
  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm(); // Khởi tạo form instance
  const [userId, setUserId] = useState('');

  const onFinishStep0 = async (values: any) => {
    const { email } = values;

    const res = await sendRequest<IBackendRes<any>>({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/auth/retry-active`,
      body: {
        email,
      },
    });

    if (res?.data) {
      setCurrent(1);
      setUserId(res?.data?._id);
    } else {
      notification.error({
        message: 'Internal Server Error',
        description: res?.message,
      });
    }
  };

  const onFinishStep1 = async (values: any) => {
    const { code } = values;

    const res = await sendRequest<IBackendRes<any>>({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/auth/check-code`,
      body: {
        id: userId,
        code,
      },
    });

    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: 'Internal Server Error',
        description: res?.message,
      });
    }
  };

  // Sử dụng useEffect để thiết lập giá trị cho form khi modal mở
  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({ email: userEmail });
    }
  }, [isModalOpen, userEmail, form]);

  if (!hasMounted) return <></>;

  return (
    <>
      <Modal
        title="Kích hoạt tài khoản"
        open={isModalOpen}
        maskClosable={false}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Steps
          current={current}
          items={[
            {
              title: 'Login',
              icon: <UserOutlined />,
            },
            {
              title: 'Verification',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Done',
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <>
            <div style={{ margin: '20px 0px' }}>
              Tài khoản chưa được kích hoạt. Vui lòng nhập lại email đã đăng ký
              để kích hoạt tài khoản.
            </div>
            <Form
              form={form} // Gắn instance form ở đây
              name="basic"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="Email" name="email">
                <Input disabled={true} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Resend
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {current === 1 && (
          <>
            <div style={{ margin: '20px 0px' }}>
              Vui lòng nhập mã xác thực đã gửi về email của bạn.
            </div>
            <Form
              form={form} // Gắn instance form ở đây
              name="basic"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Code"
                name="code"
                rules={[{ required: true, message: 'Please input your code!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Resend
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && (
          <div>Tài khoản đã kích hoạt thành công. Vui lòng đăng nhập lại.</div>
        )}
      </Modal>
    </>
  );
};

export default ModalActivate;
