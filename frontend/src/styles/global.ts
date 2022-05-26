import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.backgroundPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4 {
    font-family: 'Poppins', 'Open Sans', 'Roboto', sans-serif;
  }

  input, textarea {
    font-family: 'Roboto', sans-serif;
  }
`;
