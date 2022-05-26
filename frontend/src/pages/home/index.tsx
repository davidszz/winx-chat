import { Layout } from '@components/Layout';
import { useAuth } from '@hooks/use-auth';
import { useWsCache } from '@hooks/use-ws-cache';

export function Home() {
  const { user } = useAuth();
  const { users } = useWsCache();

  return (
    <Layout
      users={users.map((x) => ({
        ...x,
        id: x._id,
      }))}
    />
  );
}
