import { WebSocket } from 'ws';
import { WebSocketServer } from '..';

import { onMessage } from './socket/message';
import { onClose } from './socket/close';

export async function onConnection(wss: WebSocketServer, socket: WebSocket): Promise<void> {
  socket.on('message', (data) => onMessage(wss, socket, data));
  socket.on('close', (code) => onClose(wss, socket, code));
}
