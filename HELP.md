# Traductions

`@nuxtjs/i18n`

Les fichiers de traductions se trouvent dans `/app/locales/[lang].json`

La configuration de `i18n` se fait dans `nuxt.config.ts`

```ts 
    i18n: {
    defaultLocale: 'fr', // Langue par défaut de l'application
    restructureDir: './app', // Ou va se trouver le dossier `locales` pour y mettre les fichiers de trad
    strategy: 'prefix_except_default',
    locales: [ // Définition des langues de l'application
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
```
___

### Utilisation

`app/locales/fr.json`
```json
{
    "login" : "Connexion",
    "home_page" : {
        "menu" : {
            "hello" : "Bonjour"
        }
    }
}
```


`app/pages/*.vue`
```ts
<script setup lang=ts>

const { t } = useI18n();

const notif = () => {
    notif(t('login'))
}

</script>
<template>

    <div class="flex gap-3">
        <p> {{ t('login') }} </p>
        <p> {{ t('home_page.menu.hello')}}
    </div>

    <button @click="notif">
        Notification
    </button>

</templates>
```

# Middlewares

Les middleware se trouvent dans `/app/middleware/*.ts`

Les middlewares dans Nuxt permettent d’intercepter la navigation entre les pages et d’exécuter du code avant d’afficher une route.

Ils sont utilisés pour :
 - protéger des pages (auth)
 - rediriger l’utilisateur
 - charger des données
 - appliquer des règles globales de navigation

___
### Types de middleware

#### Global
- Ficher nommé `*.global.ts`
- S'éxecute à __chaque navigation__
- Exemple : `auth.global.ts`

#### Nommé
- Ficher nommé `*.ts`
- S'éxecute __unqiuement si la page l'utilise__
- Exemple : `analytics.ts`

```ts
<script setup lang=ts>
    definePageMeta({
        middleware: ['auth'], // ou 'auth' si seul
    })
</script>
```
___

### Fonctionnement interne

Si l'application n'est pas configurée en SPA, en indiquant `ssr: false` dans `nuxt.config.ts`, les middlwares s'exécutent avant le rendu de la page, peuvent bloquer la navigation, peuvent accéder au stores.

En SPA, les middlewares s'éxecutent uniquement coté client. Cette application est une SPA.

# Traitement des données

Architecture de l'appli

Nuxt 4 (Front) <-> Nitro + Prisma (back) <-> PostgresSql dans Docker (BDD)

## Postgres Docker

### Commandes docker 

Créer Container

```bash
docker run -d \
  --name postgres \ 
  -e POSTGRES_PASSWORD=******** \
  -e POSTGRES_USER=******** \
  -e POSTGRES_DB=makemenu \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:latest
```

Entrer dans le container
```bash
    docker exec -it <container_name> bash
```

Entrer dans la base de données
```bash
    psql -U <user_name> -d <db_name>
```

## Prisma

Visiter la documentation de [Prisma Postgres](https://www.prisma.io/docs/prisma-postgres/quickstart/prisma-orm)

Prisa est un ORM open-source qui est fait pour communiquer avce une BDD postgresSQL.

La commande `npx create-db` créé une base de donnée hébergé par Prisma donc publiquement accessible. Elle se supprime au bout d'un jour si le créateur ne la 'claim' pas. 

Pour migrate le schema de la BDD écrit dans `prisma/schema.prisma` :
```bash
    npx prisma migrate dev --name init
```

Ensuite générer le client :
```bash
    npx prisma generate
```

