class ApiConfig {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getUsers(): string {
    return `${this.baseUrl}/users`;
  }

  getUserById(userId: number): string {
    return `${this.baseUrl}/users/${userId}`;
  }

  getOrdersByStatus(status: string): string {
    return `${this.baseUrl}/orders?status=${status}`;
  }
}
