import { ReactNode, useState } from 'react';
import { CachedUser } from '@contexts/ws-cache-context';
import { UserProfileModal } from '@components/modals/UserProfile';
import { AuthLevel, AuthTag } from '@utils/constants';
import { Container, ContainerFull, Content, Avatar, Username } from './styles';

export interface MessageProps {
  user: CachedUser;
  content: string | ReactNode;
  full?: boolean;
}

export function Message({ user, content, full = true }: MessageProps) {
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
        <Content>{content}</Content>
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
      <Content>{content}</Content>
    </Container>
  );
}
