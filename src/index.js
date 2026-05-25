const _ = require('lodash');

const TAUX_BASE = {
  CT:  1.0,        // Crédit Terrien (référence)
  CM:  0.73,       // Crédit Martien
  JL:  1.42,       // Jeton Lunaire
  EAC: 2.15,       // Euro Astral Colonial
  CSE: 0.89,       // Crédit Station Europa
};

const NOMS_DEVISES = {
  CT:  'Crédit Terrien',
  CM:  'Crédit Martien',
  JL:  'Jeton Lunaire',
  EAC: 'Euro Astral Colonial',
  CSE: 'Crédit Station Europa',
};

/**
 * Convertit un montant d'une devise interplanétaire à une autre.
 *
 * @param {number} montant - Le montant à convertir
 * @param {string} de - Code devise source (ex: 'CM')
 * @param {string} vers - Code devise cible (ex: 'JL')
 * @returns {{ montant: number, de: string, vers: string, taux: number }}
 */
function convertir(montant, de, vers) {
  if (!_.has(TAUX_BASE, de)) {
    throw new Error(`Devise inconnue: ${de}`);
  }
  if (!_.has(TAUX_BASE, vers)) {
    throw new Error(`Devise inconnue: ${vers}`);
  }
  if (typeof montant !== 'number' || montant < 0) {
    throw new Error('Le montant doit être un nombre positif');
  }

  const enCT = montant * TAUX_BASE[de];
  const resultat = enCT / TAUX_BASE[vers];

  return {
    montant: _.round(resultat, 4),
    de: de,
    vers: vers,
    taux: _.round(TAUX_BASE[de] / TAUX_BASE[vers], 6),
  };
}

/**
 * Retourne le taux de change entre deux devises.
 */
function obtenirTaux(de, vers) {
  if (!TAUX_BASE[de] || !TAUX_BASE[vers]) {
    throw new Error('Devise inconnue');
  }
  return _.round(TAUX_BASE[de] / TAUX_BASE[vers], 6);
}

/**
 * Liste toutes les devises supportées.
 */
function listerDevises() {
  return _.map(TAUX_BASE, (taux, code) => ({
    code,
    nom: NOMS_DEVISES[code],
    tauxCT: taux,
  }));
}

/**
 * Calcule la valeur d'un portefeuille multi-devises en Crédits Terriens.
 *
 * @param {Object} portefeuille - Ex: { CM: 500, JL: 200,
 * @returns {{ totalCT: number, details: Array }}
 */
function evaluerPortefeuille(portefeuille) {
  const details = _.map(portefeuille, (montant, devise) => {
    const conversion = convertir(montant, devise, 'CT');
    return {
      devise,
      montant,
      valeurCT: conversion.montant,
    };
  });

  return {
    totalCT: _.round(_.sumBy(details, 'valeurCT'), 2),
    details,
  };
}

module.exports = {
  convertir,
  obtenirTaux,
  listerDevises,
  evaluerPortefeuille,
  TAUX_BASE,
  NOMS_DEVISES,
  VERSION: '3.2.1',
};
