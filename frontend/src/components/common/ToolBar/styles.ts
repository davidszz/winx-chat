import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  grid-area: TB;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  /* border-bottom: 1px solid ${(props) => props.theme.colors.border}; */
  background-color: ${(props) => props.theme.colors.backgroundSecondary};

  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.6);

  z-index: 1;
`;

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  height: 40px;
  user-select: none;
`;

export const ToolsIcons = styled.div`
  display: flex;
`;

export const ToolIconWrapper = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  & > svg {
    width: 20px;

    fill: ${(props) => props.theme.colors.textPrimary};
  }

  &:hover > svg {
    fill: ${(props) => props.theme.colors.textHover};
  }
`;
