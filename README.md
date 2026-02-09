<p align="center">
  <a href="https://github.com/andrianllmm/datasci-wrapped">
    <img src="https://img.shields.io/github/stars/andrianllmm/datasci-wrapped?style=for-the-badge&color=a766fe" alt="GitHub stars" />
  </a>
  <a href="https://github.com/andrianllmm/datasci-wrapped/network/members">
    <img src="https://img.shields.io/github/forks/andrianllmm/datasci-wrapped?style=for-the-badge&color=a766fe" alt="GitHub forks" />
  </a>
  <a href="https://github.com/andrianllmm/datasci-wrapped/issues">
    <img src="https://img.shields.io/github/issues/andrianllmm/datasci-wrapped?style=for-the-badge&color=a766fe" alt="GitHub issues" />
  </a>
  <a href="https://github.com/andrianllmm/datasci-wrapped/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/andrianllmm/datasci-wrapped?style=for-the-badge&color=a766fe" alt="License" />
  </a>
  <a href="https://datasci-wrapped.vercel.app">
    <img src="https://img.shields.io/badge/Live-Demo?style=for-the-badge&color=a766fe" alt="Live demo" />
  </a>
</p>

<div align="center">
  <a href="https://github.com/andrianllmm/datasci-wrapped">
    <img src="docs/images/updssoc-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">DataSci Wrapped</h3>

  <p align="center">
    Data science trends and statistics in a year-by-year "wrapped" format.
    <br />
    <br />
    <a href="https://datasci-wrapped.vercel.app"><strong>Try Now</strong></a>
    <br />
    <br />
    <a href="https://github.com/andrianllmm/datasci-wrapped/blob/main/README.md">Docs</a>
    &middot;
    <a href="https://github.com/andrianllmm/datasci-wrapped/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/andrianllmm/datasci-wrapped/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>

</div>

## About

DataSci Wrapped is a web app showing data science trends and statistics in a year-by-year "wrapped" format.
It visualizes data science metrics and trends in two modes:

### Industry Wrapped

View industry trends and statistics for the past year. Includes:

- Global data volume growth
- Data science platform market size
- Industry role salaries
- Common data processing tools
- Popular programming languages

### Personal Wrapped

Generate a personalized summary using public GitHub and StackOverflow APIs. Includes:

- Overall achievements (repos, stars, followers)
- Repository activity timeline
- StackOverflow reputation and badges
- Tools technologies used
- Programming language breakdown

### Features

- Year-based navigation
- Personal Wrapped generation from public profiles from GitHub and StackOverflow APIs
- Responsive charts and visualizations
- Community Discussions with Giscus comments
- Save Wrapped as images for sharing

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

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Issues

Found a bug or issue? Report it on the
[issues page](https://github.com/andrianllmm/datasci-wrapped/issues).
