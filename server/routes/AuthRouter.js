/* eslint-disable camelcase */
const express = require('express');
const { UserModel } = require('../database/database.js');
const router = express.Router();

router.post('/create-account', async (req, res) => {
  // Check if the user is already logged in
  if (req.session.username) {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized access to this endpoint.'
    });
    return;
  } 

  const account = req.body;

  // Validate parameters
  if (Object.keys(account).length !== 2) {
    res.status(400).json({
      status: 400,
      message: 'Invalid account object input.'
    });
    return;
  }

  // Validate properties
  if (typeof account.username !== 'string' || typeof account.password !== 'string') {
    res.status(400).json({
      status: 400,
      message: 'Invalid account object input.'
    });
    return;
  }

  // Validate username & password
  if (!account.username.match('^[a-zA-Z0-9_.-]{4,20}$') || 
    !account.password.match('^[a-zA-Z0-9]{8,30}$')) {
    res.status(400).json({
      status: 400,
      message: 'Invalid account object input.'
    });
    return;
  }

  // Check if username is already taken
  try {
    const user = await UserModel.find({ username: account.username });

    // If a user is found, return an error message
    if (Object.keys(user).length !== 0) {
      res.status(400).json({
        status: 400,
        message: 'Username already taken.'
      });
      return;
    }

    // Create the user's account
    const object = {
      username: account.username,
      password: account.password,
      wizard_slots: []
    };

    // Insert the account object
    await UserModel.create(object);

    // Set the user's session
    req.session.username = account.username;

    res.status(200).json({
      status: 200,
      message: 'Successfully created an account.'
    });
  } catch(error) {
    res.status(500).json({
      status: 500,
      message: 'Server failed to create an account.'
    });
    return;
  }  
});

router.post('/login', async (req, res) => {
  // Check if the user is already logged in
  if (req.session.username) {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized access to this endpoint.'
    });
    return;
  } 

  const account = req.body;

  // Validate parameters
  if (Object.keys(account).length !== 2) {
    res.status(400).json({
      status: 400,
      message: 'Invalid account object input.'
    });
    return;
  }

  // Validate properties
  if (typeof account.username !== 'string' && typeof account.password !== 'string') {
    res.status(400).json({
      status: 400,
      message: 'Invalid account object input.'
    });
    return;
  }

  // Validate username & password
  if (!account.username.match('^[a-zA-Z0-9_.-]{1,20}$') || 
    !account.password.match('^[a-zA-Z0-9]{8,30}$')) {
    res.status(400).json({
      status: 400,
      message: 'Invalid account object input.'
    });
    return;
  }

  // Check if the username exists
  try {
    const user = await UserModel.find({ username: account.username });
    
    // Check if a user was found
    if (Object.keys(user).length === 0) {
      res.status(400).json({
        status: 400,
        message: 'Invalid account object input.'
      });
      return;
    }
    
    // Check if the user passwords match
    const isMatch = await user[0].comparePassword(account.password);
    if (isMatch) {
      // Set the session
      req.session.username = user[0].username;

      res.status(200).json({
        status: 200,
        message: 'Successfully logged-in.'
      });
    } else {
      res.status(400).json({
        status: 400,
        message: 'Invalid account object input.'
      });
      return;
    }
  } catch(error) {
    res.status(500).json({
      status: 500,
      message: 'Server failed to login the account.'
    });
    return;
  }
});

router.delete('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200);
    res.json({
      loggedOut: true
    });
  } catch(error) {
    res.status(500);
    res.json({
      loggedOut: false
    });
  }
});

router.get('/login-status', (req, res) => {
  if (req.session.username) {
    res.status(200);
    res.send({
      loggedIn: true,
      username: req.session.username
    });
  } else {
    res.status(200);
    res.send({
      loggedIn: false
    });
  }
});

router.get('/user', async (req, res) => {
  if (req.session.username) {
    try {
      let user = await UserModel.find({ username: req.session.username });
      user = user[0];

      // Remove the password parameter
      const filteredUser = {
        username: req.session.username,
        wizard_slots: user.wizard_slots !== null && user.wizard_slots !== undefined ? 
          user.wizard_slots : []
      };

      if (Object.keys(user).length !== 0) {
        res.status(200).json({
          status: 200,
          user: filteredUser
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'Unable to find this resource.'
        });
      }
    } catch(error) {
      res.status(500).json({
        status: 500,
        message: 'Server failed to acquire this resource.'
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized access to this resource.'
    });
  }
});

router.put('/create-wizard-slot/', async (req, res) => {
  if (req.session.username) {
    try {
      const characterSlot = req.body;
      const schoolList = ['storm', 'fire', 'ice', 'life', 'death', 'myth', 'balance'];

      // Validating the contents
      if (Object.keys(characterSlot).length === 5) {
        // Check each of the parameters
        if (
          // Name
          characterSlot.name.match('^[A-Z0-9\\s]{4,20}$') &&
          // School
          schoolList.includes(characterSlot.school) &&
          // Level
          characterSlot.level > 0 && characterSlot.level <= 170 &&
          // Index
          !isNaN(characterSlot.index) && characterSlot.index >= 0 &&
          // Created
          typeof characterSlot.created === 'boolean'
        ) {
          // Fetch the currentlist of characters
          let user = await UserModel.find({ username: req.session.username });
          user = user[0];

          // Check if the user can fit anymore slots
          if (user.wizard_slots === undefined || user.wizard_slots === null) {
            user.wizard_slots = [];
          }

          if (JSON.stringify(user.wizard_slots) !== '[]') {
            // Check number of slots already
            if (user.wizard_slots.length === 10) {
              res.status(400).json({
                status: 400,
                message: 'Insufficient wizard slots.'
              });
              return;
            }

            // Check if index is within range
            if (characterSlot.index >= user.wizard_slots.length) {
              res.status(400).json({
                status: 400,
                message: 'Index outside of wizard slot range.'
              });
              return;
            }
          } else if (characterSlot.created) {
            res.status(400).json({
              status: 400,
              message: 'No wizard slots to update.'
            });
            return;
          }

          if (!user.created) {
            // Insert the new wizard slot
            user.wizard_slots.push({
              name: characterSlot.name,
              school: characterSlot.school,
              level: characterSlot.level,
              hat: null,
              robe: null,
              boots: null,
              deck: null,
              wand: null,
              athame: null,
              ring: null,
              amulet: null
            });

            // Update the wizard slots
            await UserModel.updateOne({ username: req.session.username }, {
              wizard_slots: user.wizard_slots
            });
      
            res.status(200).json({
              status: 200,
              message: 'Successfully updated the wizard slots.'
            });
          } else {
            // Insert the new wizard slot
            user.wizard_slots.push({
              name: characterSlot.name,
              school: characterSlot.school,
              level: characterSlot.level,
              hat: null,
              robe: null,
              boots: null,
              deck: null,
              wand: null,
              athame: null,
              ring: null,
              amulet: null
            });

            // Update the wizard slots
            await UserModel.updateOne({ username: req.session.username }, {
              wizard_slots: user.wizard_slots
            });
      
            res.status(200).json({
              status: 200,
              message: 'Successfully updated the wizard slots.'
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            message: 'Invalid wizard slots object.'
          });
          return;
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'Invalid wizard slots object.'
        });
        return;
      }
    } catch(error) {
      res.status(500).json({
        status: 500,
        message: 'Server failed to acquire this resource.'
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized access to this resource.'
    });
  }
});

router.delete('/delete-wizard-slot/:index', async (req, res) => {
  if (req.session.username) {
    try {
      const index = req.params.index;

      // Validate parameter
      if (isNaN(index)) {
        res.status(400).json({
          status: 400,
          message: 'Invalid index parameter.'
        });
        return;
      }

      // Validate index range
      if (index > 9 || index < 0) {
        res.status(400).json({
          status: 400,
          message: 'Invalid index parameter.'
        });
        return;
      }

      // Fetch the currentlist of characters
      let user = await UserModel.find({ username: req.session.username });
      user = user[0];

      // Edit the user's wizard slots
      if (JSON.stringify(user.wizard_slots) !== '[]') {
        if (user.wizard_slots.length > index) {
          user.wizard_slots.splice(index, 1);
        
          // Update the wizard slots
          await UserModel.updateOne({ username: req.session.username }, {
            wizard_slots: user.wizard_slots
          });
    
          res.status(200).json({
            status: 200,
            message: 'Successfully delete the wizard slot.'
          });
          return;
        }
      }
      
      // Error message
      res.status(400).json({
        status: 400,
        message: 'Invalid index parameter.'
      });
      return;
    } catch(error) {
      res.status(500).json({
        status: 500,
        message: 'Server failed to acquire this resource.'
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized access to this resource.'
    });
  }
});

module.exports = router;