# MakeMenu - Authentification

## 🚀 Démarrage rapide

### 1. Configuration de la base de données
```bash
# Démarrer PostgreSQL
docker-compose up -d

# Appliquer les migrations
npx prisma migrate dev --name add-auth-fields

# Générer le client Prisma
npx prisma generate
```

### 2. Créer des données de test
```bash
npm run seed
```

### 3. Variables d'environnement
Assurez-vous que votre `.env` contient :
```
DATABASE_URL="postgresql://alexbrgn:pwmakemenu-container@localhost:5432/makemenu"
JWT_SECRET="your-super-secret-jwt-key-change-in-production-make-it-very-long-and-random"
NUXT_PUBLIC_FAKE_AUTH=true
```

### 4. Lancer l'application
```bash
npm run dev
```

## 🔐 Utilisation de l'authentification

### Inscription
- Aller sur `/auth/register`
- Remplir le formulaire avec email, mot de passe fort, prénom et nom
- Le mot de passe doit contenir : 8+ caractères, maj/min/chiffres/spéciaux

### Connexion
- Aller sur `/auth/login`
- Utiliser les identifiants de test : `test@example.com` / `Test123!`
- Ou créer un nouveau compte

### Comptes de test
- **Email** : `test@example.com`
- **Mot de passe** : `Test123!`

## 🛡️ Sécurité implémentée

### Tokens JWT
- **Access Token** : 15 minutes, pour les API
- **Refresh Token** : 7 jours, pour renouveler l'access token
- Stockés dans des **cookies httpOnly** (sécurisés contre XSS)

### Hash des mots de passe
- **bcrypt** avec 12 rounds de salage
- Validation de la force des mots de passe

### Protection des routes
- Middleware global vérifiant l'authentification
- Routes publiques : `/auth/login`, `/auth/register`
- Toutes les autres routes nécessitent un token valide

### Endpoints API sécurisés
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `POST /api/auth/refresh` - Rafraîchir token
- `POST /api/auth/logout` - Déconnexion
- `GET /api/users/profile` - Profil utilisateur
- `GET /api/foods` - Aliments (protégé)
- `POST /api/foods` - Créer aliment (protégé)

## 🔧 Développement

### Ajouter un nouvel endpoint protégé
```typescript
// Dans server/api/example.get.ts
export default defineEventHandler(async (event) => {
  // Le middleware auth.ts vérifie automatiquement le token
  // et ajoute event.context.user
  const userId = event.context.user.id;

  // Votre logique ici...
});
```

### Utiliser l'authentification dans les composants
```vue
<script setup>
const auth = useAuthStore();

// Vérifier si connecté
const isLoggedIn = computed(() => auth.isLoggedIn);

// Accéder aux infos utilisateur
const user = computed(() => auth.user);

// Se déconnecter
const handleLogout = () => auth.logout();
</script>
```

## 🚨 Points importants

1. **Changez le JWT_SECRET** en production !
2. Les tokens sont automatiquement rafraîchis quand ils expirent
3. Les mots de passe sont hashés et ne peuvent pas être récupérés
4. Toutes les routes API sont maintenant protégées sauf l'authentification
5. Les données sont filtrées par utilisateur connecté

## 🐛 Dépannage

### Erreur "Token invalide"
- Vérifiez que le JWT_SECRET est défini
- Essayez de vous reconnecter

### Erreur "Utilisateur non trouvé"
- Lancez `npm run seed` pour créer l'utilisateur de test

### Erreur de base de données
- Vérifiez que PostgreSQL est démarré : `docker-compose ps`
- Vérifiez la DATABASE_URL dans `.env`