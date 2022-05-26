import { CachedUser } from '@contexts/ws-cache-context';
import { UserBox } from './UserBox';
import { Container, BoxTitle, BoxWrapper } from './styles';

export interface UserListProps {
  users?: CachedUser[];
  show?: boolean;
}

export function UserList({ users, show = true }: UserListProps) {
  return (
    <Container show={show}>
      <BoxWrapper>
        <BoxTitle>Conectado - {users?.length ?? 0}</BoxTitle>
        {users && users.map((x) => <UserBox key={x._id} user={x} />)}
      </BoxWrapper>
    </Container>
  );
}
