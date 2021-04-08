# Projet Boardgames

Ce projet est une API REST pour gérer une ludothèque (une collection de jeux de société).

## Stack technique

- NodeJS 14+
- NPM
- [Sqitch 0.9999+](https://sqitch.org/download/)
- PostgreSQL 12.6+
- 

## Installation

Cloner le repository en local

```bash
git clone <url de ce repo>
```

puis dans le dossier local, installer les dépendances NPM

```bash
npm i
``` 

Enfin, créer une base de données PostgreSQL et déployer le projet Sqitch dessus

```bash
createdb boardgame
sqitch deploy db:ph:boardgame
```

> Pensez à configurer PostgreSQL (ou à fournir les variables d'environnement nécessaires) pour que les commandes `createdb` et `sqitch` puissent s'exécuter correctement.

## Lancement

```bash
npm start
``` 

