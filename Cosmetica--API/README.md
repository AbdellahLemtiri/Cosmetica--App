# La Cosmetica - API Pharmacie Naturelle

API pour digitaliser les ventes de cosmétiques bio et gérer les commandes.

---

## Routes principales

### Auth
- `POST /api/register` : Inscription
- `POST /api/login` : Connexion (JWT)
- `POST /api/logout` : Déconnexion
- `GET /api/me` : Profil utilisateur

### Produits & Catégories
- `GET /api/products` / `GET /api/products/{slug}`
- `GET /api/categories` / `GET /api/categories/{id}`
- Admin : `POST/PUT/DELETE` pour produits et catégories

### Commandes
- `POST /api/orders` : Créer une commande
- `GET /api/orders` : Mes commandes
- `POST /api/orders/{id}/cancel` : Annuler
- Worker/Admin : `PATCH /api/orders/{id}/status`

### Statistiques (Admin)
- `GET /api/admin/stats` : Revenus, top produits, catégories, statuts commandes

---

## Rôles
- **User** : commandes, profil
- **Worker** : mise à jour statut commandes
- **Admin** : gestion produits/catégories, stats

---

## Installation (Docker)
```bash
git clone <url>
cd lacosmetica
cp .env.example .env
docker-compose up -d
docker exec -it lacosmetica_app composer install
docker exec -it lacosmetica_app php artisan key:generate
docker exec -it lacosmetica_app php artisan migrate --seed

#Tests
docker exec -it lacosmetica_app php artisan test
```