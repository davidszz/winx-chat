import { useState, ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useTheme } from 'styled-components';

import { CheckCircle } from '@components/icons/CheckCircle';
import { XCircle } from '@components/icons/XCircle';
import { Tooltip } from '@components/tooltips';

import { TextInputWrapper, Input, PrefixIcon, SuffixIcon } from './styles';

interface Props {
  value?: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  icon?: ReactNode;
  onChange?: (value: string) => void;
  onValidate?: () => string | undefined;
}

export function TextInput({
  value = '',
  placeholder,
  icon,
  type = 'text',
  onChange,
  onValidate,
}: Props) {
  const theme = useTheme();

  const [error, setError] = useState<string>();
  /**
   * A temp fix while the "react-tooltip" package ins't updated
   * to fix react-18 tooltips not hiding
   */
  const [showErrorTooltip, setShowErrorTooltip] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  function handleValidate() {
    if (onValidate) {
      setError(onValidate() ?? '');
    }
  }

  return (
    <TextInputWrapper>
      {icon && <PrefixIcon>{icon}</PrefixIcon>}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleValidate}
        hasPrefix={!!icon}
        hasSuffix={!!(error || (error !== undefined && onValidate))}
      />
      {error ? (
        <SuffixIcon
          data-tip={error}
          onMouseEnter={() => setShowErrorTooltip(true)}
          onMouseLeave={() => {
            setShowErrorTooltip(false);
          }}
        >
          <XCircle fill={theme.colors.red} data-tip={error} />
          {showErrorTooltip && <Tooltip effect="solid" />}
        </SuffixIcon>
      ) : (
        error !== undefined &&
        onValidate && (
          <SuffixIcon>
            <CheckCircle fill={theme.colors.green} />
          </SuffixIcon>
        )
      )}
    </TextInputWrapper>
  );
}
