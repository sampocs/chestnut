# Chestnut

A budgeting app to help track weekly expenses.

## Features

- Track weekly budget and expenses
- View spending history
- Categorize expenses by day of the week
- Real-time budget calculations

## Technology Stack

- React Native with TypeScript
- Expo
- React Navigation
- AsyncStorage for local data persistence
- Moment.js for date handling

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/chestnut.git
   cd chestnut
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Start the development server:

   ```
   npm start
   ```

   or

   ```
   yarn start
   ```

4. Run on a device or emulator:
   - Press 'a' for Android
   - Press 'i' for iOS
   - Scan the QR code with Expo Go app on your phone

## Project Structure

```
chestnut/
├── src/
│   ├── components/    # Reusable UI components
│   ├── constants/     # App constants including colors
│   ├── screens/       # App screens
│   ├── storage/       # State management
│   └── utils/         # Utility functions
├── assets/            # Static assets like images
├── App.tsx            # Main app component
└── index.ts           # App entry point
```

## License

This project is licensed under the MIT License.

## Screen Shots

<p float="left">
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/splash.png" width="200" height="430"/>
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/main.jpeg" width="200" height="430"/>
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/history.jpeg" width="200" height="430"/>
</p>
<p float="left">
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/remove.jpeg" width="200" height="430"/>
    <img src="https://github.com/sampocs/chestnut/blob/main/assets/screen-shots/budget.jpeg" width="200" height="430"/>
</p>

## Development

- Open `chestnut.xcworkspace` and click the play button

## Building an Archive

- DISCLAIMER: You must have a membership with the Apple Developer Program in order to install this app
- Follow these [steps](https://developer.apple.com/documentation/xcode/distributing-your-app-to-registered-devices) to and follow instructions to create a certificate and sign
- Open `chestnut.xcworkspace`
- Remove `libRNReactNativeHapticFeedback.a` from `Link Binary with Libraries` (under `Build Phases`)
  - For some reason, this was needed in to build the app but threw an error when trying to build an Archive
- Confirm build version on main screen
- Create an Archive
  - Connect your device and select it from the target bar at the top
  - Go to `Product` -> `Archive`

## Distributing via USB

- Click `Distribute App`, `Custom`, and then `Ad Hoc`
- Use Apple Configurator 2 to upload the `.ipa` file to the device

## Distributing via TestFlight

- Click `Distribute App` and then `App Store Connect`
- Click `Upload`
- It will take ~15 minutes for the new build to show up in `apple.developer.com`
  - When asked whether the app uses encryption, select "no"
