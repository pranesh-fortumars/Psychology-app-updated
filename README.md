# ClarityMind: Enterprise Mental Health Platform 🍃

ClarityMind is a comprehensive, production-ready healthcare management platform designed specifically for mental health professionals and patients. Built on a modern React Native (Expo) architecture, it offers a seamless, premium cross-platform experience across Mobile and Desktop web views.

---

## 🏗 System Architecture Diagram

```mermaid
graph TD
    %% Define User Personas
    subgraph Users
        Admin([👨‍💼 Administrator])
        Doctor([🩺 Therapist/Doctor])
        Patient([🧘 Patient])
    end

    %% Define Presentation Layer (Expo/React Native)
    subgraph "Frontend Layer (React Native Web/Mobile)"
        direction TB
        AuthUI["Auth & RBAC (Login/Signup)"]
        AdminDash["Admin Dashboard\n(Analytics & Logs)"]
        DoctorDash["Doctor Interface\n(Sessions & Reports)"]
        PatientDash["Patient Interface\n(History & Feedback)"]
        
        AuthUI --> AdminDash
        AuthUI --> DoctorDash
        AuthUI --> PatientDash
    end

    %% Define Business Logic Services
    subgraph "Service Layer"
        DataService{"dataService.ts\n(State & Business Logic)"}
        NotificationEngine["expo-notifications\n(Real-Time Alerts)"]
        PDFEngine["expo-print\n(HTML to PDF Gen)"]
        CRON["Auto-Delete\n(Data Retention CRON)"]
    end

    %% Define Data Layer
    subgraph "Data Storage"
        DB[(firebaseMockService\nReal-time Data Sync)]
    end

    %% Connections
    Admin --> AuthUI
    Doctor --> AuthUI
    Patient --> AuthUI

    AdminDash --> DataService
    DoctorDash --> DataService
    PatientDash --> DataService

    DoctorDash -.-> PDFEngine
    DataService -.-> NotificationEngine
    CRON -.-> DataService

    DataService <==> DB
```

---

## 🌟 Key Features

### 👨‍💼 Administrator Capabilities
- **Platform Analytics:** Real-time dashboards monitoring total users, active patients, doctors, and platform revenue.
- **Security & Maintenance:** Active CRON job logs validating the automated 30-day data retention purge (HIPAA-ready compliance workflows).
- **Role Management:** Total oversight over all registered users and session histories.

### 🩺 Therapist (Doctor) Capabilities
- **Session Intelligence:** Deep insights into upcoming appointments and historical patient data.
- **Dynamic PDF Reports:** Built-in `expo-print` engine to compile clinical notes, therapy suggestions, and patient status into native, exportable PDF documents.
- **In-App Notifications:** Real-time push notifications (`expo-notifications`) triggered when accepting or rejecting patient appointment requests.
- **Feedback Loop:** Direct visibility into 5-star patient ratings and written session reviews.

### 🧘 Patient Capabilities
- **Frictionless Onboarding:** Quick access to book sessions based on specialized therapeutic topics.
- **Session Reviews:** Interactive post-session feedback modules to rate their therapist experience securely.
- **Wallet & Coin System:** Dummy-integrated recharge flow for booking premium telehealth appointments.

---

## 🛠 Technology Stack
- **Framework:** React Native / Expo (Universal App for iOS, Android, and Web)
- **Styling:** Custom "Oceanic" Design System (High-contrast, Accessible, Responsive)
- **Routing:** Expo Router (File-based navigation)
- **Native Modules:** 
  - `expo-print` & `expo-sharing` (Report Generation)
  - `expo-notifications` (Event Triggers)
  - `@expo/vector-icons` (UI Components)
- **Backend Architecture:** Robust Service-Oriented Architecture (`dataService.ts`) mimicking Firebase/Supabase real-time NoSQL snapshot workflows.

---

> Edited for use in IDX on 07/09/12

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

#### Android

Android previews are defined as a `workspace.onStart` hook and started as a vscode task when the workspace is opened/started.

Note, if you can't find the task, either:
- Rebuild the environment (using command palette: `IDX: Rebuild Environment`), or
- Run `npm run android -- --tunnel` command manually run android and see the output in your terminal. The device should pick up this new command and switch to start displaying the output from it.

In the output of this command/task, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You'll also find options to open the app's developer menu, reload the app, and more.

#### Web

Web previews will be started and managred automatically. Use the toolbar to manually refresh.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
