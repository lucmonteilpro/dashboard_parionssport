# Dashboard DSP - Parions Sport 🎯

Dashboard lecture seule pour visualiser les campagnes DSP de Parions Sport avec authentification sécurisée.

## 📋 Table des matières

1. [Setup Local](#setup-local)
2. [Configuration](#configuration)
3. [Déploiement](#déploiement)
4. [Utilisation](#utilisation)

---

## 🚀 Setup Local

### Prérequis

- **Node.js** 16+ (télécharger depuis https://nodejs.org/)
- **npm** ou **yarn** (inclus avec Node.js)
- **Git** (optionnel)

### Étapes

1. **Cloner ou télécharger le projet**
   ```bash
   cd dashboard-parions-sport
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration (voir section suivante)**

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

   Le dashboard sera accessible à `http://localhost:3000`

5. **Arrêter le serveur**
   ```
   Ctrl + C
   ```

---

## ⚙️ Configuration

### Fichier `.env.local` - À COMPLÉTER

Le fichier `.env.local` contient toutes les variables secrètes. **Jamais le committer sur Git!**

#### 1. Google Sheets API

**Obtenir les clés:**

1. Aller sur https://console.cloud.google.com/
2. Créer un nouveau projet → "Dashboard Parions Sport"
3. Activer l'API "Google Sheets API"
4. Créer une clé API (type: API Key)
5. Copier la clé → `GOOGLE_API_KEY`

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=1smJhv7bcumwsIw8zO1D7pQaLmxornGUcSDqEButCaos
GOOGLE_API_KEY=AIzaSy... [votre clé API]
```

#### 2. Authentification

**Générer le hash du mot de passe:**

1. Ouvrir Node.js REPL:
   ```bash
   node
   ```

2. Exécuter:
   ```javascript
   const bcrypt = require('bcryptjs');
   const password = "votre_mot_de_passe_secret";
   bcrypt.hash(password, 10).then(hash => console.log(hash));
   ```

3. Copier le hash retourné → `ADMIN_PASSWORD_HASH`

```env
ADMIN_EMAIL=parions@sport.fr
ADMIN_PASSWORD_HASH=$2a$10$... [hash généré]
JWT_SECRET=un_secret_tres_long_et_aleatoire_minimum_32_caracteres
```

**Générer un JWT_SECRET:**
```bash
openssl rand -base64 32
```

Ou utiliser n'importe quelle chaîne aléatoire de 32+ caractères.

```env
JWT_SECRET=votre_secret_super_secret_de_32_caracteres_minimum
```

#### 3. Configuration globale

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Fichier `.env.local` - Exemple complet

```env
# Google Sheets
NEXT_PUBLIC_GOOGLE_SHEET_ID=1smJhv7bcumwsIw8zO1D7pQaLmxornGUcSDqEButCaos
GOOGLE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxx

# Auth
ADMIN_EMAIL=parions@sport.fr
ADMIN_PASSWORD_HASH=$2a$10$abcdefghijklmnopqrstuvwxyz...
JWT_SECRET=mon_secret_super_long_et_aleatoire_32_chars_minimum

# General
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🌐 Déploiement

### Option 1: Vercel (RECOMMANDÉ - 5 min)

Vercel est optimisé pour Next.js et très facile.

1. Créer un compte: https://vercel.com (gratuit)

2. Connecter ton repo GitHub

3. Aller dans **Settings** → **Environment Variables**
   - Ajouter toutes les variables de `.env.local`

4. Cliquer **Deploy**

5. Ton dashboard est live! 🎉

**URL**: `https://dashboard-parions-sport.vercel.app` (à personnaliser)

### Option 2: Netlify

1. Créer un compte: https://netlify.com

2. Connecter ton repo

3. Ajouter les Environment Variables (Settings → Build & Deploy → Environment)

4. Deploy

### Option 3: Serveur Node.js (VPS)

```bash
# Build
npm run build

# Start production
npm start
```

---

## 📖 Utilisation

### Login

1. Aller sur `http://localhost:3000`
2. Entrer l'email: **parions@sport.fr**
3. Entrer le mot de passe: **celui configuré dans ADMIN_PASSWORD_HASH**
4. Cliquer "Se connecter"

### Dashboard

Une fois connecté, tu vois:

- **Tableau des campagnes** avec:
  - Nom de la campagne
  - Budget total et dépense actuelle
  - Barre de progression (vert < 50%, orange 50-75%, rouge > 75%)
  - Clics, Installations
  - CPA et ROAS
  - Statut (live/paused)

- **Statistiques globales**:
  - Nombre total de campagnes
  - Dépense totale
  - Total clics et installations

### Données

Les données sont **lues directement du Google Sheet** configuré dans `.env.local`:
- **Refresh automatique**: Chaque rechargement de page
- **Calendrier**: Les données sont agrégées par Campaign Name et mois

---

## 🔒 Sécurité

### ✅ Implémenté

- ✅ Authentification email + password avec JWT
- ✅ Tokens expirables (7 jours)
- ✅ Lecture seule des données (aucune modification possible)
- ✅ Filtrage côté serveur (pas frontend)
- ✅ URL non indexable (robots: noindex)

### 🚀 À ajouter pour production

- [ ] HTTPS obligatoire
- [ ] Rate limiting sur les endpoints
- [ ] Logs d'accès
- [ ] Refresh tokens (rotation)
- [ ] IP whitelist (optionnel)

---

## 📱 Structure du Projet

```
dashboard-parions-sport/
├── pages/
│   ├── index.tsx              # Redirection page racine
│   ├── login.tsx              # Formulaire login
│   ├── dashboard.tsx          # Dashboard principal
│   └── api/
│       ├── auth/
│       │   └── login.ts       # API login
│       └── campaigns.ts       # API campagnes
│
├── components/
│   ├── CampaignTable.tsx      # Tableau campagnes
│   └── ProgressBar.tsx        # Barre progression budget
│
├── lib/
│   ├── googleSheets.ts        # Client Google Sheets API
│   └── auth.ts                # Logique authentification
│
├── styles/
│   └── globals.css            # Styles globaux
│
├── .env.local                 # Variables secrètes (⚠️ NE PAS COMMITTER)
├── package.json               # Dépendances
├── tsconfig.json              # Config TypeScript
├── tailwind.config.js         # Config Tailwind CSS
└── README.md                  # Cette documentation
```

---

## 🆘 Troubleshooting

### Erreur: "Module not found: googleapis"

```bash
npm install googleapis
```

### Erreur: "GOOGLE_API_KEY not provided"

Vérifier que `.env.local` contient `GOOGLE_API_KEY`.

### Erreur: "Token JWT invalide"

- Vérifier que `JWT_SECRET` est configuré
- Essayer de se reconnecter

### Données ne s'affichent pas

- Vérifier que le Google Sheet est accessible
- Vérifier que `GOOGLE_API_KEY` a la permission Sheets API
- Vérifier que `NEXT_PUBLIC_GOOGLE_SHEET_ID` est correct

---

## 📞 Support

Pour toute question:
- Vérifier la section [Troubleshooting](#troubleshooting)
- Consulter les logs du navigateur (F12 → Console)
- Vérifier les logs serveur (console du terminal)

---

**✨ Dashboard prêt pour la démo commerciale!**
