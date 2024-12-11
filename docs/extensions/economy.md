# Economic System Extension

The Economic System extension provides a comprehensive framework for managing virtual economies within Zens cities, including currency systems, markets, trade, and financial institutions.

## Features

- Virtual currency management
- Market simulation
- Trade systems
- Banking infrastructure
- Economic indicators
- Financial regulations

## Installation

```bash
npm install @zens-framework/economy
```

## Configuration

```javascript
{
  "economyConfig": {
    "currency": "ZensCoin",
    "initialSupply": 1000000,
    "inflationRate": 0.02,
    "marketUpdateInterval": "1m"
  }
}
```

## Core Components

### Currency System

```javascript
const currency = new ZensCurrency({
  name: 'ZensCoin',
  symbol: 'ZC',
  decimals: 2,
  initialSupply: 1000000
});
```

### Market System

```javascript
const market = new ZensMarket({
  products: ['food', 'energy', 'housing'],
  updateInterval: '1m',
  priceVolatility: 0.1
});
```

## Usage

### Managing Currency

```javascript
// Create new currency
await economy.createCurrency({
  name: 'ZensCoin',
  supply: 1000000,
  distribution: 'equal'
});

// Manage inflation
await economy.adjustInflation({
  rate: 0.02,
  period: 'yearly',
  mechanism: 'automatic'
});
```

### Market Operations

```javascript
// Create market
const market = await economy.createMarket({
  name: 'Central Market',
  products: ['food', 'energy'],
  tradingHours: {
    start: '09:00',
    end: '17:00'
  }
});

// Set up trading
await market.enableTrading({
  minimumOrder: 1,
  maximumOrder: 1000,
  fees: 0.01
});
```

## Advanced Features

### Banking System

```javascript
// Initialize banking system
const bank = new ZensBank({
  name: 'Central Bank',
  reserves: 1000000,
  interestRate: 0.05
});

// Create account
await bank.createAccount({
  owner: 'citizen123',
  type: 'savings',
  initialDeposit: 1000
});
```

### Economic Policies

```javascript
// Implement monetary policy
await economy.setMonetaryPolicy({
  type: 'expansionary',
  interestRate: 0.03,
  reserveRequirement: 0.1
});

// Control inflation
await economy.implementInflationControl({
  target: 0.02,
  mechanism: 'interest_rate',
  adjustment: 'gradual'
});
```

## Market Analysis

### Price Monitoring

```javascript
// Monitor market prices
const prices = await market.getPrices({
  products: ['food', 'energy'],
  period: '24h',
  interval: '1h'
});
```

### Economic Indicators

```javascript
// Get economic indicators
const indicators = await economy.getIndicators({
  metrics: ['gdp', 'inflation', 'employment'],
  period: '1m'
});
```

## Trading System

### Order Management

```javascript
// Place market order
await market.placeOrder({
  type: 'buy',
  product: 'energy',
  quantity: 100,
  price: 'market'
});

// Create limit order
await market.createLimitOrder({
  type: 'sell',
  product: 'food',
  quantity: 50,
  price: 10.5
});
```

## Financial Institutions

### Banking Operations

```javascript
// Process transaction
await bank.processTransaction({
  from: 'account1',
  to: 'account2',
  amount: 1000,
  type: 'transfer'
});

// Calculate interest
await bank.calculateInterest({
  account: 'savings123',
  period: '1m',
  compound: 'daily'
});
```

## Best Practices

1. **Market Stability**
   - Implement circuit breakers
   - Monitor trading volumes
   - Control price volatility

2. **Currency Management**
   - Maintain adequate reserves
   - Control money supply
   - Monitor exchange rates

3. **Risk Management**
   - Implement trading limits
   - Monitor system exposure
   - Regular auditing

## API Reference

### Economy Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `createCurrency` | Creates new currency | `name`, `supply`, `properties` |
| `createMarket` | Creates new market | `name`, `products`, `rules` |
| `processTransaction` | Processes financial transaction | `from`, `to`, `amount` |

## Troubleshooting

Common issues and their solutions:

1. **Market Volatility**
   - Implement price limits
   - Adjust trading rules
   - Monitor trading patterns

2. **Currency Issues**
   - Check money supply
   - Verify transaction logs
   - Review monetary policy

## Related Documentation

- [Multi-City System](./multi-city.md)
- [Trading System](./trading.md)
- [Banking Infrastructure](./banking.md) 