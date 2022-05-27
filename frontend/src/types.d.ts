interface APIUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  authLevel?: import('@utils/constants').AuthLevel;
  createdAt: Date;
  updatedAt: Date;
}

interface APIMessage {
  id: string;
  content: string;
  author: APIUser;
  nonce?: string;
  createdAt: Date;
}
