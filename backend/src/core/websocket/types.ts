import { OpCode, WSEvent } from '@utils/constants';

export interface HelloMessage {
  op: OpCode.Hello;
  d: {
    heartbeatInterval: number;
  };
}

export interface IdentifyMessage {
  op: OpCode.Identify;
  d: {
    token: string;
  };
}

export interface EventMessage {
  op: OpCode.Event;
  t: WSEvent;
  d: Record<string, any>;
}

export interface HeartbeatMessage {
  op: OpCode.Heartbeat;
}

export type Message = HelloMessage | IdentifyMessage | EventMessage | HeartbeatMessage;
