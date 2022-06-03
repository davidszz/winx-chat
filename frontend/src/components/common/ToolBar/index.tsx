import { LogoutSolid } from '@components/icons/LogoutSolid';
import { UserGroupSolid } from '@components/icons/UserGroupSolid';

import { ToolbarWrapper, LogoLink, Logo, ToolsIcons, ToolIconWrapper } from './styles';

interface Props {
  onUserListButtonClick: () => void;
}

export function Toolbar({ onUserListButtonClick }: Props) {
  return (
    <ToolbarWrapper>
      <LogoLink href="/">
        <Logo src="/static/winx.png" alt="Winx Logo" />
      </LogoLink>

      <ToolsIcons>
        <ToolIconWrapper onClick={onUserListButtonClick}>
          <UserGroupSolid />
        </ToolIconWrapper>
        <ToolIconWrapper>
          <LogoutSolid />
        </ToolIconWrapper>
      </ToolsIcons>
    </ToolbarWrapper>
  );
}
