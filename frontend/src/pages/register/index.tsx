import { Link } from 'react-router-dom';

import { Button } from '@components/ui/Button';
import { TextInput } from '@components/ui/TextInput';

import {
  Wrapper,
  Content,
  Container,
  Header,
  InputWrapper,
  InputLabel,
  Logo,
  LoginLabel,
} from './styles';

export function RegisterPage() {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Logo src="/static/winx.png" alt="Winx Logo" />
        </Header>
        <Content>
          <InputWrapper>
            <InputLabel>Nome de usuário</InputLabel>
            <TextInput placeholder="Ex.: Winx Flora" />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Email</InputLabel>
            <TextInput type="email" placeholder="flora@winx.com" />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Senha</InputLabel>
            <TextInput type="password" placeholder="Digite sua senha" />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Confirmar senha</InputLabel>
            <TextInput type="password" placeholder="Digite sua senha novamente" />
          </InputWrapper>
        </Content>
        <LoginLabel>
          Já possui uma conta?&nbsp;
          <Link to="/login">Faça login</Link>
        </LoginLabel>
        <Button>CRIAR CONTA</Button>
      </Container>
    </Wrapper>
  );
}
