import { MouseEvent, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Wrapper, ModalBody } from './styles';

export interface ModalProps {
  open?: boolean;
  handleClose?: () => void;
  width?: number;
  height?: number;
  children?: ReactNode;
}

export function Modal({ open = false, handleClose, width, height, children }: ModalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleCloseModal(ev: MouseEvent) {
    if (handleClose && wrapperRef.current === (ev.target as Node)) {
      handleClose();
    }
  }

  return (
    <CSSTransition
      nodeRef={wrapperRef}
      in={open}
      unmountOnExit
      mountOnEnter
      timeout={{
        exit: 200,
      }}
      classNames="transition"
    >
      <Wrapper ref={wrapperRef} onMouseDown={handleCloseModal}>
        <ModalBody width={width} height={height}>
          {children}
        </ModalBody>
      </Wrapper>
    </CSSTransition>
  );
}
