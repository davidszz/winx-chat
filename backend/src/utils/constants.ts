export enum OpCode {
  Event,
  Identify,
  Hello,
  Heartbeat,
  HeartBeatACK,
}

export enum CloseEventCode {
  UnknownError = 4000,
  AuthFailed = 4004,
  AlreadyAuth = 4005,
  Unauthenticated = 4006,
}

export enum AuthLevel {
  Common,
  Moderator,
  Administrator,
  Developer,
}

export enum WSEvent {
  INITIAL_STATE = 'INITIAL_STATE',
  USER_CONNECTED = 'USER_CONNECTED',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  MESSAGE_CREATE = 'MESSAGE_CREATE',
}

export const HEARTBEAT_INTERVAL = 60000;
