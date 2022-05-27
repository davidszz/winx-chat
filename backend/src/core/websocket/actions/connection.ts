import { WebSocket } from 'ws';

import { WebSocketServer } from '..';

import { onClose } from './socket/close';
import { onMessage } from './socket/message';

export async function onConnection(wss: WebSocketServer, socket: WebSocket): Promise<void> {
  socket.on('message', (data) => onMessage(wss, socket, data));
  socket.on('close', (code) => onClose(wss, socket, code));
}
