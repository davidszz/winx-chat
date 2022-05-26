import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from '@components/ui/TextInput';
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/use-auth';
import { AxiosError } from 'axios';
import { APIError } from '@lib/api';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { Container, LoginContainer, InputWrapper, Logo, InputLabel, ErrorBox } from './styles';

export function Login() {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmailInputValue(value);
    },
    [setEmailInputValue]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPasswordInputValue(value);
    },
    [setPasswordInputValue]
  );

  const handleEmailValidation = useCallback((value: string) => {
    if (!validator.isEmail(value)) {
      return 'Email inválido';
    }
    return undefined;
  }, []);

  const handlePasswordValidation = useCallback((value: string) => {
    if (value.length < 1) {
      return 'Forneça uma senha';
    }
    return undefined;
  }, []);

  function handleLogin() {
    setLoggingIn(true);
    signIn(emailInputValue, passwordInputValue)
      .catch((err: AxiosError<APIError>) => {
        if (err.response?.status && [401, 404].includes(err.response?.status)) {
          setErrorMsg('Email e/ou senha incorretos.');
        } else {
          setErrorMsg(
            err.response?.data.message ??
              'Ocorreu um erro ao fazer login, tente novamente mais tarde.'
          );
        }
      })
      .finally(() => {
        setLoggingIn(false);
      });
  }

  if (user) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Logo src="/assets/images/winx.png" alt="winx logo" />
      <LoginContainer>
        <InputWrapper>
          <InputLabel>Email</InputLabel>
          <TextInput
            placeholder="Email"
            value={emailInputValue}
            onChange={handleEmailChange}
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            validate={handleEmailValidation}
            disabled={loggingIn}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Senha</InputLabel>
          <TextInput
            placeholder="Senha"
            value={passwordInputValue}
            onChange={handlePasswordChange}
            hideValue
            icon={<FontAwesomeIcon icon={faKey} />}
            validate={handlePasswordValidation}
            disabled={loggingIn}
          />
        </InputWrapper>
        <Button
          loading={loggingIn}
          disabled={!(emailInputValue && passwordInputValue)}
          onClick={handleLogin}
        >
          Fazer login
        </Button>
        {errorMsg && <ErrorBox>{errorMsg}</ErrorBox>}
      </LoginContainer>
    </Container>
  );
}
