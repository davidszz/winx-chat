import { WebSocket } from 'ws';
import { CloseEventCode, OpCode } from '@utils/constants';
import { WebSocketServer } from '..';

export async function onHeartbeat(wss: WebSocketServer, socket: WebSocket): Promise<void> {
  if (!wss.users.has(socket)) {
    socket.close(CloseEventCode.Unauthenticated);
    return;
  }

  wss.connections.add(socket);

  socket.send(
    JSON.stringify({
      op: OpCode.HeartBeatACK,
    })
  );
}
