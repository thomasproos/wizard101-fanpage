/* eslint-disable camelcase */
// Imports
const mongoose = require('mongoose');
require('dotenv').config({ path: require('find-config')('.env') });
const dbURL = process.env.DB_URL;
const bcrypt = require('bcrypt');

main().catch(err => console.error(err));

async function main() {
  await mongoose.connect(dbURL);
}

const RequiredString = {
  type: String,
  required: true,
};

const RequiredNumber = {
  type: Number,
  required: true
};

const RequiredBoolean = {
  type: Boolean,
  required: true
};

const itemSchema = new mongoose.Schema({
  name: RequiredString,
  type: RequiredString,
  health: RequiredNumber,
  mana: RequiredNumber,
  energy: RequiredNumber,
  power_pip: RequiredNumber,
  shadow_pip: RequiredNumber,
  archmastery: RequiredNumber,
  universal_damage: RequiredNumber,
  universal_resistance: RequiredNumber,
  universal_accuracy: RequiredNumber,
  universal_critical: RequiredNumber,
  universal_critical_block: RequiredNumber,
  universal_pierce: RequiredNumber,
  stun_resistance: RequiredNumber,
  universal_pip_conversion: RequiredNumber,
  outgoing_healing: RequiredNumber,
  ingoing_healing: RequiredNumber,
  school_damage: {
    fire_damage: RequiredNumber,
    ice_damage: RequiredNumber,
    storm_damage: RequiredNumber,
    myth_damage: RequiredNumber,
    life_damage: RequiredNumber,
    death_damage: RequiredNumber,
    balance_damage: RequiredNumber,
    shadow_damage: RequiredNumber
  },
  school_resistance: {
    fire_resistance: RequiredNumber,
    ice_resistance: RequiredNumber,
    storm_resistance: RequiredNumber,
    myth_resistance: RequiredNumber,
    life_resistance: RequiredNumber,
    death_resistance: RequiredNumber,
    balance_resistance: RequiredNumber,
    shadow_resistance: RequiredNumber
  },
  school_accuracy: {
    fire_accuracy: RequiredNumber,
    ice_accuracy: RequiredNumber,
    storm_accuracy: RequiredNumber,
    myth_accuracy: RequiredNumber,
    life_accuracy: RequiredNumber,
    death_accuracy: RequiredNumber,
    balance_accuracy: RequiredNumber,
    shadow_accuracy: RequiredNumber
  },
  school_critical: {
    fire_critical: RequiredNumber,
    ice_critical: RequiredNumber,
    storm_critical: RequiredNumber,
    myth_critical: RequiredNumber,
    life_critical: RequiredNumber,
    death_critical: RequiredNumber,
    balance_critical: RequiredNumber,
    shadow_critical: RequiredNumber
  },
  school_critical_block: {
    fire_critical_block: RequiredNumber,
    ice_critical_block: RequiredNumber,
    storm_critical_block: RequiredNumber,
    myth_critical_block: RequiredNumber,
    life_critical_block: RequiredNumber,
    death_critical_block: RequiredNumber,
    balance_critical_block: RequiredNumber,
    shadow_critical_block: RequiredNumber
  },
  school_pierce: {
    fire_pierce: RequiredNumber,
    ice_pierce: RequiredNumber,
    storm_pierce: RequiredNumber,
    myth_pierce: RequiredNumber,
    life_pierce: RequiredNumber,
    death_pierce: RequiredNumber,
    balance_pierce: RequiredNumber,
    shadow_pierce: RequiredNumber
  },
  school_pip_conversion: {
    fire_pip_conversion: RequiredNumber,
    ice_pip_conversion: RequiredNumber,
    storm_pip_conversion: RequiredNumber,
    myth_pip_conversion: RequiredNumber,
    life_pip_conversion: RequiredNumber,
    death_pip_conversion: RequiredNumber,
    balance_pip_conversion: RequiredNumber,
    shadow_pip_conversion: RequiredNumber
  },
  sockets: [{
    type: RequiredString,
    jewel_type: RequiredString,
    jewel_stat: RequiredNumber,
    jewel_spell: RequiredString 
  }],
  school_only: RequiredString,
  school_not_allowed: RequiredString,
  level_requirement: RequiredNumber,
  tradeable: RequiredBoolean,
  auction: RequiredBoolean,
  crown: RequiredBoolean,
  spells: [RequiredString],
  sources: [{
    name: RequiredString,
    wiki_article: RequiredString
  }]
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  wizard_slots: [itemSchema]
});

// Hash user password
userSchema.pre('save', function(next) {
  var user = this;

  // Only hashes the password if it has been modified (or new)
  if (!user.isModified('password')) {
    return next();
  }

  // Generate salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // Hash the password using the new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const HatModel = mongoose.model('Hat', itemSchema);
const RobeModel = mongoose.model('Robe', itemSchema);
const BootsModel = mongoose.model('Boots', itemSchema);
const RingModel = mongoose.model('Ring', itemSchema);
const DeckModel = mongoose.model('Deck', itemSchema);
const WandModel = mongoose.model('Wand', itemSchema);
const AthameModel = mongoose.model('Athame', itemSchema);
const AmuletModel = mongoose.model('Amulet', itemSchema);
const UserModel = mongoose.model('User', userSchema);

function close() {
  mongoose.connection.close();
}

module.exports = {
  HatModel,
  RobeModel,
  BootsModel,
  RingModel,
  DeckModel,
  WandModel,
  AthameModel,
  AmuletModel,
  UserModel,
  close
};