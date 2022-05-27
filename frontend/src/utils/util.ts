import { DefaultAvatars } from './constants';

export class Util {
  static getDefaultAvatarById(id: string) {
    const timestamp = parseInt(id.slice(0, 8), 16);
    return DefaultAvatars[
      !Number.isNaN(timestamp) ? Number(timestamp.toString().slice(-1)) % DefaultAvatars.length : 0
    ];
  }
}
