export class NameRegistry {
  private static instance: NameRegistry;
  private usedNames: Set<string> = new Set();

  private constructor() {}

  static getInstance(): NameRegistry {
    if (!this.instance) {
      this.instance = new NameRegistry();
    }
    return this.instance;
  }

  isNameTaken(name: string): boolean {
    return this.usedNames.has(name.toLowerCase());
  }

  registerName(name: string): void {
    this.usedNames.add(name.toLowerCase());
  }

  clear(): void {
    this.usedNames.clear();
  }
} 