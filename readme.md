# Brewhaus Vue App - A brewery discovery app

A Vue 3 + Ionic 8 + Capacitor mobile application for discovering breweries. This app uses the OpenBreweryDB API to help users find and explore breweries.

## Features

- 🔍 Search breweries
- 📋 Filter by brewery type
- ♾️ Infinite scroll pagination
- 📱 Mobile-first design
- 📍 Location-based information
- 🌐 Web and native mobile support

## Tech Stack

- Vue 3
- Ionic 8
- Capacitor
- TypeScript
- OpenBreweryDB API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm
- Ionic CLI (`npm install -g @ionic/cli`)
- iOS development: Xcode (for iOS deployment)
- Android development: Android Studio (for Android deployment)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd brewhaus
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
ionic serve
```

### Building for Mobile

#### iOS
```bash
ionic build
ionic cap add ios
ionic cap sync
ionic cap open ios
```

#### Android
```bash
ionic build
ionic cap add android
ionic cap sync
ionic cap open android
```

## Project Structure

```
src/
├── App.vue
├── main.ts
├── router/
│   └── index.ts
├── services/
│   └── brewery-service.ts
├── theme/
│   └── variables.css
└── views/
    ├── HomePage.vue
    └── BreweryDetailPage.vue
```

## API Reference

This app uses the OpenBreweryDB API:
- Base URL: `https://api.openbrewerydb.org/v1`
- Documentation: [OpenBreweryDB Docs](https://www.openbrewerydb.org/)

## Development Commands

- `ionic serve` - Start development server
- `ionic build` - Build the project
- `ionic cap sync` - Sync build with native projects
- `ionic cap run ios -l --external` - Run on iOS with live reload
- `ionic cap run android -l --external` - Run on Android with live reload

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.