import { UserRepository } from "../repositories/UserRepository";
import { generateToken, verifyToken } from "../utils/auth";

export class AuthService {
  private userRepository = new UserRepository();

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  login(): string {
    const payLoad = {
      timeStamp: new Date().getTime,
    };
    const token = generateToken(payLoad);
    this.userRepository.addToken(token);
    return token;
  }

  async verify(token: string): Promise<boolean> {
    if (!this.userRepository.isTokenActive(token)) return false;
    try {
      await verifyToken(token);
      return true;
    } catch {
      return false;
    }
  }

  logout(token: string): void {
    this.userRepository.removeToken(token);
  }
}
