import { useState } from 'react';

import { useWsCache } from '@hooks/use-ws-cache';

import { Diversity } from '@components/icons/Diversity';

import { Wrapper, UserListToggleBtn } from './styles';

import { Chat } from '../Chat';
import { ToolBar } from '../ToolBar';
import { UserList } from '../UserList';

export function Layout() {
  const { users } = useWsCache();
  const [showUserList, setShowUserList] = useState(true);

  function toggleUserList() {
    setShowUserList((state) => !state);
  }

  return (
    <Wrapper>
      <ToolBar>
        <UserListToggleBtn onClick={toggleUserList}>
          <Diversity fill="#fff" />
        </UserListToggleBtn>
      </ToolBar>
      <Chat />
      <UserList users={users} show={showUserList} />
    </Wrapper>
  );
}
