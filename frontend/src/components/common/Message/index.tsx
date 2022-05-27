import { memo, ReactNode, useState } from 'react';

import { UserProfileModal } from '@components/common/UserProfile';

import { Container, ContainerFull, Content, Avatar, Username } from './styles';

export interface MessageProps {
  user: APIUser;
  content: string | ReactNode;
  full?: boolean;
  pending?: boolean;
}

function MessageComponent({ user, content, full = true, pending }: MessageProps) {
  const [showProfile, setShowProfile] = useState(false);

  function handleToggleProfile() {
    setShowProfile((state) => !state);
  }

  if (full) {
    return (
      <ContainerFull>
        <Avatar
          onClick={handleToggleProfile}
          src={user.avatar}
          alt={`Avatar de ${user.username}`}
        />
        <Username onClick={handleToggleProfile}>{user.username}</Username>
        <Content pending={pending}>{content}</Content>
        <UserProfileModal
          user={user}
          open={showProfile}
          handleClose={() => setShowProfile(false)}
        />
      </ContainerFull>
    );
  }

  return (
    <Container>
      <Content pending={pending}>{content}</Content>
    </Container>
  );
}

export const Message = memo(MessageComponent);
