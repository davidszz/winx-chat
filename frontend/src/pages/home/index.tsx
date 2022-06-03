import { useState } from 'react';

import { Chat } from '@components/common/Chat';
import { Toolbar } from '@components/common/Toolbar';
import { UserList } from '@components/common/UserList';

import { Wrapper } from './styles';

export function HomePage() {
  /**
   * Starts with hidden if the current window size is smaller than 768px
   */
  const [showUserList, setShowUserList] = useState(() => window.innerWidth > 768);

  function handleToggleUserList() {
    setShowUserList((state) => !state);
  }

  return (
    <Wrapper hideUserList={!showUserList}>
      <Chat />
      <UserList show={showUserList} />
      <Toolbar onUserListButtonClick={handleToggleUserList} />
    </Wrapper>
  );
}
