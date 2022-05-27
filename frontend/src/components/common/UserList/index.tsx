import { Container, BoxTitle, BoxWrapper } from './styles';

import { UserBox } from '../UserBox';

export interface UserListProps {
  users?: APIUser[];
  show?: boolean;
}

export function UserList({ users, show = true }: UserListProps) {
  return (
    <Container show={show}>
      <BoxWrapper>
        <BoxTitle>Conectado - {users?.length ?? 0}</BoxTitle>
        {users && users.map((x) => <UserBox key={x.id} user={x} />)}
      </BoxWrapper>
    </Container>
  );
}
