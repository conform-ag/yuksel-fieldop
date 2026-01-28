# Yuksel FieldOp Mobile App

A React Native (Expo) application for field sales operations, integrated with Yuksel ERP via BFF pattern.

## Features
*   **Offline First**: SQLite database syncs data for offline use.
*   **Customer Management**: Map view, geolocation check-in, prospect creation.
*   **Smart Catalog**: Live stock and calculated pricing.
*   **Visit Management**: Track visits, check-in/out location, photos.
*   **Expense Logging**: seamless expense tracking.
*   **Smart Quoting**: Create quotes instantly.

## Architecture
*   **Frontend**: React Native, Expo, Paper UI.
*   **Backend**: `yuksel_app` Custom BFF API (`api/mobile.py`).
*   **Database**: SQLite (Local), MariaDB (Server).

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure API**:
    *   Edit `src/api/client.js` and set `BASE_URL` to your ERPNext server.

3.  **Run Engine**:
    ```bash
    npx expo start
    ```
    *   Press `a` for Android Emulator.
    *   Press `i` for iOS Simulator.
    *   Scan QR code with Expo Go.

## Folder Structure
*   `src/api`: BFF API Client & Sync Logic.
*   `src/database`: SQLite initialization.
*   `src/screens`: UI Screens.
*   `src/context`: Auth State Management.
