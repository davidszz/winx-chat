import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useTheme } from 'styled-components';

export function Tooltip(props: TooltipProps) {
  const theme = useTheme();

  return (
    <ReactTooltip
      backgroundColor={theme.colors.tooltipBackground}
      textColor={theme.colors.tooltipText}
      {...props}
    />
  );
}
