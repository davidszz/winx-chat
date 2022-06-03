import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    background: ${(props) => props.theme.colors.backgroundPrimary};
    color: ${(props) => props.theme.colors.textPrimary};

    width: 100%;
    height: 100%;
  }

  input, textarea {
    outline: none;
    color: inherit;
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.textLink};

    &:hover {
      text-decoration: underline;
    }
  }
`;
