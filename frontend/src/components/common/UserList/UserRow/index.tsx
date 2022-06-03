import { memo } from 'react';

import { Avatar, Status, User, Username, UsernameWrapper } from './styles';

interface Props {
  avatar: string;
  username: string;
  status?: string;
  offline?: boolean;
}

function UserRowComponent({ avatar, username, status, offline }: Props) {
  return (
    <User offline={!!offline}>
      <Avatar src={avatar} alt={`Avatar de ${username}`} />
      <UsernameWrapper>
        <Username>{username}</Username>
        {status && <Status>{status}</Status>}
      </UsernameWrapper>
    </User>
  );
}

export const UserRow = memo(UserRowComponent);
