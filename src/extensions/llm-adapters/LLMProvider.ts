export interface LLMResponse {
    text: string;
    metadata?: {
        model: string;
        confidence?: number;
        tokens?: number;
    };
}

export interface LLMConfig {
    model: string;
    temperature?: number;
    maxTokens?: number;
    apiKey?: string;
    endpoint?: string;
}

/**
 * Base interface for Language Model providers
 */
export interface LLMProvider {
    initialize(config: LLMConfig): Promise<void>;
    generate(prompt: string): Promise<LLMResponse>;
    generateWithContext(prompt: string, context: string[]): Promise<LLMResponse>;
    estimateTokens(text: string): number;
}

/**
 * Factory class for creating LLM provider instances
 */
export class LLMProviderFactory {
    private static providers: Map<string, new () => LLMProvider> = new Map();

    public static registerProvider(name: string, provider: new () => LLMProvider): void {
        this.providers.set(name, provider);
    }

    public static createProvider(name: string): LLMProvider {
        const Provider = this.providers.get(name);
        if (!Provider) {
            throw new Error(`LLM provider '${name}' not found`);
        }
        return new Provider();
    }
}

/*
Note: This file is in testing phase and not yet fully integrated with the core framework.
The implementation is subject to change and should not be used in production environments.
*/ 