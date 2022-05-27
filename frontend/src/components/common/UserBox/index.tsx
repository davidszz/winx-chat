import { useState } from 'react';

import { UserProfileModal } from '@components/common/UserProfile';

import { Avatar, Container, Username } from './styles';

export interface UserBoxProps {
  user: APIUser;
}

export function UserBox({ user }: UserBoxProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <Container onClick={() => setProfileOpen(true)} selected={profileOpen}>
        <Avatar src={user.avatar} alt={`Avatar de ${user.username}`} />
        <Username>{user.username}</Username>
      </Container>

      <UserProfileModal open={profileOpen} handleClose={() => setProfileOpen(false)} user={user} />
    </>
  );
}
