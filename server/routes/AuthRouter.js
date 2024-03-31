/* eslint-disable camelcase */
const express = require('express');
const { RobeModel } = require('../database/database.js');
const router = express.Router();

router.get('/authenticate', async (req, res) => {
  try {
    const testItem = RobeModel({
      name: 'MALISTAIRE\'S CLOAK OF FLUX',
      type: 'robe',
      health: 529,
      mana: 0,
      energy: 0,
      power_pip: 9,
      shadow_pip: 12,
      archmastery: 0,
      universal_damage: 0,
      universal_resistance: 14,
      universal_accuracy: 0,
      universal_critical: 0,
      universal_critical_block: 0,
      universal_pierce: 0,
      stun_resistance: 0,
      universal_pip_conversion: 0,
      outgoing_healing: 0,
      ingoing_healing: 0,
      school_damage: {
        fire_damage: 0,
        ice_damage: 0,
        storm_damage: 27,
        myth_damage: 0,
        life_damage: 0,
        death_damage: 0,
        balance_damage: 0,
        shadow_damage: 0
      },
      school_resistance: {
        fire_resistance: 0,
        ice_resistance: 0,
        storm_resistance: 0,
        myth_resistance: 0,
        life_resistance: 0,
        death_resistance: 0,
        balance_resistance: 0,
        shadow_resistance: 0
      },
      school_accuracy: {
        fire_accuracy: 0,
        ice_accuracy: 0,
        storm_accuracy: 25,
        myth_accuracy: 0,
        life_accuracy: 0,
        death_accuracy: 0,
        balance_accuracy: 0,
        shadow_accuracy: 0
      },
      school_critical: {
        fire_critical: 0,
        ice_critical: 0,
        storm_critical: 115,
        myth_critical: 0,
        life_critical: 0,
        death_critical: 0,
        balance_critical: 0,
        shadow_critical: 0
      },
      school_critical_block: {
        fire_critical_block: 0,
        ice_critical_block: 0,
        storm_critical_block: 0,
        myth_critical_block: 0,
        life_critical_block: 0,
        death_critical_block: 0,
        balance_critical_block: 0,
        shadow_critical_block: 0
      },
      school_pierce: {
        fire_pierce: 0,
        ice_pierce: 0,
        storm_pierce: 0,
        myth_pierce: 0,
        life_pierce: 0,
        death_pierce: 0,
        balance_pierce: 0,
        shadow_pierce: 0
      },
      school_pip_conversion: {
        fire_pip_conversion: 0,
        ice_pip_conversion: 0,
        storm_pip_conversion: 0,
        myth_pip_conversion: 0,
        life_pip_conversion: 0,
        death_pip_conversion: 0,
        balance_pip_conversion: 0,
        shadow_pip_conversion: 0
      },
      sockets: [],
      school_only: 'Storm',
      school_not_allowed: 'n/a',
      level_requirement: 100,
      tradeable: true,
      auction: false,
      crown: false,
      spells: [
        'Shadow Trap',
        'Shadow Trap'
      ],
      sources: [{
        name: 'Malistaire the Undying (Shadow)',
        // eslint-disable-next-line max-len
        wiki_article: 'https://wiki.wizard101central.com/wiki/Creature:Malistaire_the_Undying_(Shadow)'
      }]
    });

    // Save the user
    testItem.save();

    // Test if it saved
    // const user = await UserModel.find({ username: 'test123' });
    // const isMatch = await user[0].comparePassword('abc123');
    // console.log('Match: ' + isMatch); 

    // const isNotMatch = await user[0].comparePassword('asd123123');
    // console.log('Match: ' + isNotMatch);

    res.status(200).json('Success');

  } catch(error) {
    res.status(500).json('Failed to login');
  }
});

module.exports = router;