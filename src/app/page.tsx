import { auth } from '@/auth';
import HomePage from '@/components/layout/homepage';
import { Button } from 'antd';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <HomePage />
      <Button>Sign in</Button>
    </div>
  );
}
