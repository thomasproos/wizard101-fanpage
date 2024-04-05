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
      const user = await UserModel.find({ username: req.session.username });

      // Remove the password parameter
      delete user.password;

      if (Object.keys(user).length !== 0) {
        res.status(200).json({
          status: 200,
          user: user
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'Unable to find this resource.'
        });
        return;
      }
    } catch(error) {
      res.status(500).json({
        status: 500,
        message: 'Server failed to acquire this resource.'
      });
      return;
    }
  } else {
    res.status(400).json({
      status: 400,
      message: 'Unauthorized access to this resource.'
    });
    return;
  }
});

module.exports = router;