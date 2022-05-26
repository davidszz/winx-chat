import { WebSocket } from 'ws';
import { BaseManager } from '.';
import { User } from '../structures/user';

export class UsersManager extends BaseManager<WebSocket, User> {
  public getById(id: string): User | undefined {
    return this.find((x) => x._id === id);
  }

  public getSocketById(id: string): WebSocket | undefined {
    return this.findKey((x) => x._id === id);
  }

  public uniqValues(): User[] {
    return [...this.values()].filter((x, i, arr) => arr.findIndex((u) => u._id === x._id) === i);
  }

  public broadcast(data: string): void {
    this.forEach((_, socket) => {
      if (socket.readyState === socket.OPEN) {
        socket.send(data);
      }
    });
  }
}
