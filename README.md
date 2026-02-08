# DataSci Wrapped

An application showing data science trends and statistics in a year-by-year "wrapped" format.

## About

Visualizes data science metrics and trends in two modes:

### Industry Wrapped

- Global data volume growth
- Data science platform market size
- Industry role salaries
- Common data processing tools
- Popular programming languages

### Personal Wrapped

Generate a personalized summary using public GitHub and StackOverflow APIs.

Includes:

- Programming language breakdown
- Tools and technologies used
- Project activity timeline
- GitHub stats (repos, stars, followers)
- StackOverflow reputation and badges

### Features

- Year-based navigation
- Personal wrapped generation from public profiles
- Responsive charts and visualizations
- Animated transitions and scroll-based animations
- Custom cursor
- Real-time data fetching from GitHub and StackOverflow APIs

## Development

### Installation

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```plaintext
.
├── app         # pages and layouts
├── components  # React components
│   ├── charts  # data visualizations
│   ├── slides  # individual slides
│   ├── ui      # base UI components
├── data        # data catalog and type definitions
└── lib         # utilities
    └── api     # GitHub, StackOverflow, and data transformation services

```

## Contributing

Contributions are welcome! To get started:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Issues

Found a bug or issue? Report it on the
[issues page](https://github.com/andrianllmm/datasci-wrapped/issues).
