import { LoadingSpinner } from '@components/spinners/LoadingSpinner';
import { Container } from './styles';

export function LoadingScreen() {
  return (
    <Container>
      <LoadingSpinner scale={2} />
    </Container>
  );
}
