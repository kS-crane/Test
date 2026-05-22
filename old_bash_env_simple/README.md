# spaceman-analytics

> Bundle analytics toolkit by Dr. Leo Spaceman (pronounced spa-CHE-min)

A lightweight analytics library for tracking events and measuring bundle sizes across your applications.

## Install

```bash
npm install spaceman-analytics
```

## Usage

```javascript
const { track, identify, page } = require('spaceman-analytics');

identify('user-123', { plan: 'pro' });
page('Dashboard');
track('button_click', { label: 'signup' });
```

## API

### `track(event, data)`
Track a custom event with optional data payload.

### `identify(userId, traits)`
Associate a user ID with traits for future events.

### `page(name, properties)`
Track a page view with optional properties.

## Development

```bash
npm install     # install dependencies
npm run lint    # check code style
npm run build   # build dist/
npm test        # run test suite
```

## Configuration

Build-time configuration is managed via `.env`. See the file for available
options including build mode, feature flags, and telemetry settings.

## Security

This project uses integrity verification in CI to prevent supply-chain attacks.
All critical files — including `package.json`, build scripts, config files,
and `.npmrc` — are checksummed before any code is executed. The pipeline also
scans for unauthorized executables and verifies workflow file integrity.

See `.github/workflows/bundle-analysis.yml` for details.

## Contributing

PRs welcome. All submissions are automatically analyzed for bundle size
impact and must pass integrity checks.

## License

MIT
