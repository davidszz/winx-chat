import { Server } from 'http';
import { ServerOptions, WebSocket, WebSocketServer as WSS } from 'ws';
import { HEARTBEAT_INTERVAL } from '@utils/constants';
import { onConnection } from './actions/connection';
import { UsersManager } from './managers/users';

export class WebSocketServer extends WSS {
  public readonly server: Server;
  public users: UsersManager;
  private heartbeat: NodeJS.Timeout;
  public connections: Set<WebSocket>;

  constructor(options?: ServerOptions) {
    super(options);
    this.server = options.server;
    this.users = new UsersManager();
    this.connections = new Set();

    this.startHeartbeat();

    this.on('connection', (socket) => onConnection(this, socket));
  }

  private startHeartbeat(): void {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
    }

    this.heartbeat = setInterval(() => {
      this.users.forEach((_, socket) => {
        if (socket.readyState === socket.CONNECTING || socket.readyState === socket.OPEN) {
          if (!this.connections.has(socket)) {
            socket.close();
          }
        }
      });

      this.connections.clear();
    }, HEARTBEAT_INTERVAL);
  }
}
