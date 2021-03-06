import { WebSocket } from 'ws';

import { UserModel } from '@database/models/user';
import { api } from '@lib/api';
import logger from '@logger';
import AuthService from '@services/auth-service';
import { CloseEventCode, HEARTBEAT_INTERVAL, OpCode, WSEvent } from '@utils/constants';

import { WebSocketServer } from '..';

import { User } from '../structures/user';
import { IdentifyMessage } from '../types';

export async function onIdentify(wss: WebSocketServer, socket: WebSocket, data: IdentifyMessage['d']): Promise<void> {
  if (wss.users.has(socket)) {
    socket.close(CloseEventCode.AlreadyAuth);
    return;
  }

  try {
    const tokenData = AuthService.jwtVerify(data.token);
    if (tokenData.sub) {
      const response = await api.get<UserModel>('/users/@me', {
        headers: {
          'x-access-token': data.token,
        },
      });

      if (response.data?.id) {
        const user = new User(response.data);
        logger.info(`[Socket] ${user.username} connected`);

        if (!wss.users.some((x) => x.id === user.id)) {
          wss.users.broadcast(
            JSON.stringify({
              op: OpCode.Event,
              t: WSEvent.USER_CONNECTED,
              d: user.toJSON(),
            })
          );
        }

        wss.users.set(socket, user);
        wss.connections.add(socket);

        socket.send(
          JSON.stringify({
            op: OpCode.Hello,
            d: {
              heartbeatInterval: HEARTBEAT_INTERVAL,
            },
          })
        );

        socket.send(
          JSON.stringify({
            op: OpCode.Event,
            t: WSEvent.INITIAL_STATE,
            d: {
              users: wss.users.uniqValues().map((x) => x.toJSON()),
            },
          })
        );
      }
    }
  } catch {
    socket.close(CloseEventCode.AuthFailed);
  }
}
