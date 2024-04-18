

# Readme ![language](https://img.shields.io/badge/language-javascript-blue.svg)

Attention cette application fonctionne sur Android mais est optimisé pour IOS !

Vous pouvez lancer l'application dictement sur le lien suivant : 
https://expo.dev/preview/update?message=Pour%20tester%20l%27app%20t%C3%A9l%C3%A9chargez%20Expo%20go.%20(fonctionne%20sur%20Adroid%20mais%20application%20optimis%C3%A9%20pour%20IOS).&updateRuntimeVersion=1.0.0&createdAt=2024-04-18T10%3A14%3A35.313Z&slug=exp&projectId=2eac5ab9-1734-4418-b663-af258897b41c&group=a20b0976-ca0c-4b7b-b2f6-2dbaf4338659

### Si vous voulez tester l'application en local veuillez suivre les indications suivantes : 


## :package: Installation

Le back-end est hebergé sur Vercel donc les fetchs pourront etre effectué sans le lancer en local. 

### Étape 1: Installer Node.js


Avant d'installer ce projet, vous devez vérifier si Node.js est installé sur votre ordinateur.

Pour vérifier si Node.js est installé, exécutez cette commande dans votre terminal :


```
node -v
```

Si vous obtenez une réponse comme v14.17.0, cela signifie que Node.js est installé et vous pouvez passer à la section suivante.

Sinon vous pouvez télécharger et installer Node.js depuis le site officiel de Node.js.

## Étape 2: Installer Expo CLI

Expo CLI est un outil en ligne de commande qui sert à développer des applications React Native. Installez Expo CLI en utilisant npm :

```sh
npm install -g expo-cli
```

Ou si vous préférez utiliser Yarn, vous pouvez installer ainsi :

```sh
yarn global add expo-cli
```


## Étape 3: Cloner le dépôt et installer les dépendances du projet

Tout d'abord, clonez le dépôt de votre projet en utilisant la commande suivante :

```sh
git clone git@github.com:yourusername/yourprojectname.git
cd yourprojectname
```

Installer les autres dépendances

Dans le répertoire de votre projet, installez Express.js et les autres dépendances nécessaires en utilisant npm (le gestionnaire de paquets de Node.js) :

```sh
npm install
```

Si votre projet utilise Yarn comme gestionnaire de paquets, vous pouvez exécuter :

```sh
yarn install
```


## 🚀 Usage


## Installer l'application Expo Go

Sur votre appareil mobile, téléchargez et installez l'application "Expo Go" depuis l'App Store (pour iOS) ou Google Play Store (pour Android).

## Scanner le QR Code

Une fois que le Metro Bundler est lancé dans votre navigateur, un QR code apparaîtra à l'écran. Ouvrez l'application Expo Go sur votre appareil mobile et utilisez l'option "Scan QR Code" pour scanner ce QR code.

Après avoir scanné le QR code, votre application commencera à charger et à s'exécuter sur votre appareil via Expo Go. Cela vous permettra de voir les changements en temps réel pendant que vous développez.

(Vous pouvez aussi prendre en photo le Qr code directement avec l'appareil photo de votre smartphone).

## Configurer l'api google map

Pour avoir la proposition des adresses lorsque vous en renseigner une dans l'application il faut créer un fichier .env dans la racine du dossier Front et ajouter votre clé google map Api.

Voici le lien pour la créer : https://developers.google.com/maps/documentation/javascript/get-api-key?hl=Fr

## Maintenant vous pouvez tester l'application sur votre téléphone ! 





