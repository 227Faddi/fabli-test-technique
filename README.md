# 🎙️ Expo Audio Recorder App

Une application d’enregistrement audio minimaliste développée avec **Expo** et **TypeScript**.
L’application permet aux utilisateurs d’enregistrer de l’audio, de le sauvegarder localement et de le réécouter plus tard.

https://github.com/user-attachments/assets/fd9edfe7-54f1-4a56-8186-70ef6618ca85

---

## 🚀 Fonctionnalités

- Démarrer/Arrêter l’enregistrement audio
- Indicateur visuel pendant l’enregistrement
- Stockage local avec `expo-file-system`
- Lecture avec les boutons Lecture/Pause
- Noms de fichiers basés sur un horodatage
- Affichage de la durée de l’enregistrement
- Suppression des enregistrements
- Gestion des permissions
- Support des plateformes : Android & iOS

---

## 🛠️ Installation & Configuration

### Prérequis

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Git

### Démarrage

```bash
# Cloner le dépôt
git clone https://github.com/227Faddi/fabli-test-technique
cd fabli-test-technique

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

### IOS Build

```bash
npx expo run:ios
```

### Android Build

```bash
npx expo run:android
```
