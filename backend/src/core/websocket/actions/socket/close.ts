import { WebSocket } from 'ws';
import { WebSocketServer } from '@core/websocket';
import { CloseEventCode, OpCode, WSEvent } from '@utils/constants';
import logger from '@logger';

export function onClose(wss: WebSocketServer, socket: WebSocket, code?: number): void {
  if (code !== CloseEventCode.AlreadyAuth) {
    wss.connections.delete(socket);

    const user = wss.users.get(socket);
    if (user) {
      logger.info(`[Socket] ${user.username} disconnected`);
      wss.users.delete(socket);

      if (!wss.users.some((x) => x._id === user._id)) {
        wss.users.broadcast(
          JSON.stringify({
            op: OpCode.Event,
            t: WSEvent.USER_DISCONNECTED,
            d: user,
          })
        );
      }
    }
  }
}
