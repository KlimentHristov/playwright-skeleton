export class PlayerModel {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public score?: number
  ) {}

  toJson(): Record<string, any> {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      ...(this.score !== undefined && { score: this.score })
    };
  }
}
