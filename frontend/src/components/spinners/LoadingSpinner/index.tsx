import { StyleProps, Container } from './styles';

interface Props extends StyleProps {}

export function LoadingSpinner(props: Props) {
  return <Container {...props} />;
}
