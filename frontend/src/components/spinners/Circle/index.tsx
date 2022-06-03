import { CircleWrapper } from './styles';

interface Props {
  scale?: number;
  color?: string;
}

export function Circle({ scale = 1, color }: Props) {
  return <CircleWrapper color={color} scale={scale} />;
}
