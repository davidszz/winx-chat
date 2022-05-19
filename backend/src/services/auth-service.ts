import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class AuthService {
  public static async encryptPassword(password: string, salt = 10): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public static async comparePasswords(password: string, encryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }

  public static jwtSign(sub: string): string {
    return jwt.sign({ sub }, process.env.JWT_SECRET_KEY, {
      expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  public static jwtVerify<T extends JwtPayload>(token: string): T {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as T;
  }
}
