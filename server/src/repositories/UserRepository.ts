export class UserRepository {
  private activeToken: Set<string> = new Set();

  addToken(token: string): void {
    this.activeToken.add(token);
  }

  removeToken(token: string): void {
    this.activeToken.delete(token);
  }

  isTokenActive(token: string): boolean { 
    return this.activeToken.has(token);
  }
}
