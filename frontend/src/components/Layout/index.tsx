import { Diversity } from '@components/icons/Diversity';
import { useState } from 'react';
import { CachedUser } from '@contexts/ws-cache-context';
import { ToolBar } from './ToolBar';
import { UserList } from './UserList';
import { Wrapper, UserListToggleBtn } from './styles';
import { Chat } from './Chat';

export interface LayoutProps {
  users?: CachedUser[];
}

export function Layout({ users }: LayoutProps) {
  const [showUserList, setShowUserList] = useState(true);

  function toggleUserList() {
    setShowUserList((state) => !state);
  }

  return (
    <Wrapper>
      <ToolBar>
        <UserListToggleBtn onClick={toggleUserList}>
          <Diversity />
        </UserListToggleBtn>
      </ToolBar>
      <Chat />
      <UserList users={users} show={showUserList} />
    </Wrapper>
  );
}
