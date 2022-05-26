import { RawData, WebSocket } from 'ws';
import { WebSocketServer } from '@core/websocket';
import { Message } from '@core/websocket/types';
import { OpCode } from '@utils/constants';

import { onIdentify } from '@core/websocket/listeners/identify';
import { onHeartbeat } from '@core/websocket/listeners/heartbeat';

export function onMessage(wss: WebSocketServer, socket: WebSocket, data: RawData): void {
  try {
    const json: Message = JSON.parse(data.toString());

    switch (json.op) {
      case OpCode.Identify:
        onIdentify(wss, socket, json.d);
        break;

      case OpCode.Heartbeat:
        onHeartbeat(wss, socket);
        break;

      default:
        break;
    }
  } catch {
    // Nothing
  }
}
