import { UserListWrapper, UsersContainer, ContainerTitle } from './styles';

import { UserRow } from './UserRow';

interface Props {
  show?: boolean;
}

export function UserList({ show }: Props) {
  return (
    <UserListWrapper show={!!show}>
      <UsersContainer>
        <ContainerTitle>Conectado - 1</ContainerTitle>
        <UserRow
          avatar="https://static.wikia.nocookie.net/naruto/images/e/e7/Sasuke_epi_319.png/revision/latest?cb=20130629210647&path-prefix=pt-br"
          username="Sasuke"
        />
      </UsersContainer>
      <UsersContainer>
        <ContainerTitle>Desconectado - 0</ContainerTitle>
      </UsersContainer>
    </UserListWrapper>
  );
}
