# Zens Framework

<div align="center">

![Zens Logo](assets/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-Powered-brightgreen)](https://openai.com/)

</div>

> Zens is a powerful framework for creating and simulating intelligent agent-based cities with dynamic social interactions, memory systems, and evolving relationships.

## 🌟 Features

- 🤖 **Advanced Agent System**: Create citizens with unique personalities, memories, and behaviors
- 🔄 **Dynamic Interactions**: Realistic social interactions between agents
- 💾 **Persistent Memory**: Agents remember past interactions and relationships
- 🌐 **Multi-City Support**: Create and connect multiple city simulations
- 💱 **Economic System**: Implement virtual economies with currencies and trade
- 🔌 **LLM Flexibility**: Support for multiple language models
- 🌍 **Internet Connectivity**: Agents can interact with real-world data

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (Node.js package manager)
- API key for your chosen language model

## 🚀 Quick Start

1. **Installation**
   ```bash
   git clone https://github.com/CiroNova/zens-framework.git
   cd zens
   npm install
   ```

2. **Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Initialize Your First City**
   ```bash
   npm run initiate "Your City Theme"
   ```

## 📚 Documentation

Visit our [comprehensive documentation](docs/README.md) for detailed information about:
- [Core Concepts](docs/core-concepts.md)
- [Architecture](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [Advanced Usage](docs/advanced-usage.md)

## 🛠️ Basic Usage

### Creating and Managing Citizens
```bash
# Add new citizens
npm run addCitizens

# Generate interactions
npm run addInteractions

# Chat with a citizen
npm run chat "FirstName" "LastName"
```

### Creating Specific Interactions
```bash
npm run specificInteraction
```

## 🏗️ Project Structure

```
zens/
├── src/
│   ├── core/           # Core framework functionality
│   ├── models/         # Data models and schemas
│   ├── services/       # Business logic and services
│   └── types/          # TypeScript definitions
├── extensions/         # Additional features and modules
├── data/              # Data storage
└── docs/              # Documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for their powerful language models
- Contributors and community members

---


---