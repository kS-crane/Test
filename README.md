# @banque-stellaire/taux-change

> SDK officiel de conversion de devises interplanétaires — Banque Stellaire S.A.

Bibliothèque légère pour convertir entre les devises du système solaire. Utilisée par les terminaux de paiement, les applications marchandes et les systèmes de règlement interbancaire à travers les colonies.


## Utilisation

```javascript
const { convertir, evaluerPortefeuille } = require('@banque-stellaire/taux-change');

// Convertir 500 Crédits Martiens en Jetons Lunaires
const resultat = convertir(500, 'CM', 'JL');
console.log(resultat);
// { montant: 257.0423, de: 'CM', vers: 'JL', taux: 0.514085 }

// Évaluer un portefeuille multi-devises en Crédits Terriens
const portefeuille = evaluerPortefeuille({ CM: 500, JL: 200, TT: 1000 });
console.log(portefeuille.totalCT);
// 959.5
```

## Devises supportées

| Code | Devise | Taux / CT |
|------|--------|-----------|
| CT | Crédit Terrien | 1.00 |
| CM | Crédit Martien | 0.73 |
| JL | Jeton Lunaire | 1.42 |
| EAC | Euro Astral Colonial | 2.15 |
| CSE | Crédit Station Europa | 0.89 |

## API

### `convertir(montant, de, vers)`
Convertit un montant entre deux devises. Retourne le montant converti, les codes devises et le taux appliqué.

### `obtenirTaux(de, vers)`
Retourne le taux de change entre deux devises.

### `listerDevises()`
Liste toutes les devises supportées avec leurs taux de base.

### `evaluerPortefeuille(portefeuille)`
Calcule la valeur totale d'un portefeuille multi-devises en Crédits Terriens.

## Développement

```bash
npm install        # installer les dépendances
npm run lint       # vérifier le code
npm run build      # construire dist/
npm test           # lancer les tests
```

## Contribuer

Les contributions sont les bienvenues. Chaque PR est automatiquement analysée pour l'impact sur la taille du bundle. Le SDK doit rester léger — les terminaux de paiement sur les stations spatiales ont une bande passante limitée.

