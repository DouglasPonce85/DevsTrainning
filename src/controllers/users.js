var _ = require('lodash');

const knex = require('../middleware/knex');

const consts = require('../configs/consts');
const helper = require('../services/helper');
const listUsersMock = require('../../data/users');

function getUsersFromDB(res) {
  knex.from('users')
    .select("*")
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select >> [ getUsersFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    });
}

function getUsersFromMock(res) {
  res.send({ result: listUsersMock });
}

function getUsersByIdFromDB(res, user_id) {
  knex.where({
    user_id
  }).from('users')
    .select("*")
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select() >> [ getUsersByIdFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    })
}

function getUsersByIdFromMock(res, user_id) {
  try {
    let usersFound = null;
    _.findIndex(listUsersMock, (users) => {
      if (users.user_id == user_id)
        usersFound = users;
    });

    res.send({ result: usersFound });
  } catch (err) {
    helper.controllerErrorRaised('getUsersByIdFromMock', err, consts.typeErrors.CONTROLLER_RAISED, next);
  }
}

module.exports = {
  listAllUsers(req, res) {
    if (helper.isUsingMockData())
      getUsersFromMock(res);
    else
      getUsersFromDB(res);
  },

  listUsersById(req, res) {
    const { user_id } = req.params;
    if (helper.isUsingMockData())
      getUsersByIdFromMock(res, user_id);
    else
      getUsersByIdFromDB(res, user_id);
  },

  listUsersByActive(req, res) {
    try {
      const { active } = req.params;
      knex.where({
        is_active: active
      }).from('users')
        .select("*")
        .then((users) => {
          res.send({ users });
        })
        .catch((err) => {
          helper.controllerErrorRaised('Knex trying to read from DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('listUsersByActive', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  insertUsers(req, res, next) {
    try {
       const { first_name, last_name, is_active} = req.body;
      if (!first_name) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide valid info');
        return;
      }
      console.log(first_name);
      console.log(last_name);
      console.log(is_active);
      knex('users').insert({ first_name, last_name, is_active })
        .then((usersInserted) => {
          res.send({ usersInserted });
        }).catch((err) => {
          helper.controllerErrorRaised('knex trying to insert on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })

    } catch (err) {
      helper.controllerErrorRaised('insertUsers', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  updateUsers(req, res) {
    try {
      const { user_id } = req.params;
      const { first_name, last_name, is_active } = req.body;

      if (!user_id) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide a user id');
        return;
      }

      knex('users')
        .where('user_id', user_id)
        .update({
            first_name, 
            last_name,
            is_active
        }).then((result) => {
          res.send({ result });
        }).catch((err) => {
          helper.controllerErrorRaised('Knex trying to update on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('updateUsers', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  deleteUsers(req, res) {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide a users id');
        return;
      }

      knex('users')
        .where('user_id', user_id)
        .del()
        .then((result) => {
          res.send({ result });
        }).catch((err) => {
          helper.controllerErrorRaised('Knex trying to delete on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('deleteUsers', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  }
}