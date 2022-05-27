import { AuthLevel, AuthTag } from '@utils/constants';

import { Background, Container, UserAvatar, UserContent, Username, UserTag } from './styles';

import { Modal } from '../../ui/Modal';

export interface UserProfileProps {
  open?: boolean;
  handleClose?: () => void;

  user: APIUser;
}

export function UserProfileModal({ user, ...props }: UserProfileProps) {
  const userTag = AuthTag[user.authLevel ?? AuthLevel.Common];

  return (
    <Modal width={600} {...props}>
      <Container>
        <Background />
        <UserContent>
          <UserAvatar src={user.avatar} alt={`Avatar de ${user.username}`} />
          <Username>
            {user.username}
            <UserTag color={userTag.color}>{userTag.name}</UserTag>
          </Username>
        </UserContent>
      </Container>
    </Modal>
  );
}
