import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { EnvelopeSolid } from '@components/icons/EnvelopeSolid';
import { KeySolid } from '@components/icons/KeySolid';
import { Button } from '@components/ui/Button';
import { TextInput } from '@components/ui/TextInput';

import {
  Wrapper,
  Container,
  Header,
  Logo,
  Content,
  InputWrapper,
  InputLabel,
  CreateAccountLabel,
} from './styles';

export function LoginPage() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(value: string) {
    setEmail(value.trim());
  }

  function handlePasswordChange(value: string) {
    setPassword(value.trim());
  }

  function handleValidateEmail() {
    if (!email.trim()) {
      return 'Por favor, forneça um email válido.';
    }
    return '';
  }

  function handleValidatePassword() {
    if (!password.trim()) {
      return 'Por favor, forneça uma senha válida.';
    }
    return '';
  }

  return (
    <Wrapper>
      <Container>
        <Header>
          <Logo src="/static/winx.png" alt="Winx Logo" />
        </Header>
        <Content>
          <InputWrapper>
            <InputLabel>Email</InputLabel>
            <TextInput
              value={email}
              placeholder="Email"
              type="email"
              icon={<EnvelopeSolid fill={theme.colors.brand} />}
              onChange={handleEmailChange}
              onValidate={handleValidateEmail}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Senha</InputLabel>
            <TextInput
              value={password}
              placeholder="Senha"
              type="password"
              icon={<KeySolid fill={theme.colors.brand} />}
              onChange={handlePasswordChange}
              onValidate={handleValidatePassword}
            />
          </InputWrapper>
        </Content>
        <CreateAccountLabel>
          Não possui uma conta?&nbsp;
          <Link to="/register">Crie uma</Link>
        </CreateAccountLabel>
        <Button>ENTRAR</Button>
      </Container>
    </Wrapper>
  );
}
