var _ = require('lodash');

const knex = require('../middleware/knex');

const consts = require('../configs/consts');
const helper = require('../services/helper');
const listRolesMock = require('../../data/roles');

function getRolesFromDB(res) {
  knex.from('roles')
    .select("*")
    .then((roles) => {
      res.send({ roles });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select >> [ getRolesFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    });
}

function getRolesFromMock(res) {
  res.send({ result: listRolesMock });
}

function getRolesByIdFromDB(res, rol_id) {
  knex.where({
    rol_id
  }).from('roles')
    .select("*")
    .then((roles) => {
      res.send({ roles });
    })
    .catch((err) => {
      helper.controllerErrorRaised('knex.select() >> [ getRolesByIdFromDB ]', err, consts.typeErrors.DB_ERROR_RAISED, next);
    })
}

function getRolesByIdFromMock(res, rol_id) {
  try {
    let rolesFound = null;
    _.findIndex(listRolesMock, (roles) => {
      if (roles.rol_id == rol_id)
        rolesFound = roles;
    });

    res.send({ result: rolesFound });
  } catch (err) {
    helper.controllerErrorRaised('getRolesByIdFromMock', err, consts.typeErrors.CONTROLLER_RAISED, next);
  }
}

module.exports = {
  listAllRoles(req, res) {
    if (helper.isUsingMockData())
      getRolesFromMock(res);
    else
      getRolesFromDB(res);
  },

  listRolesById(req, res) {
    const { rol_id } = req.params;
    if (helper.isUsingMockData())
      getRolesByIdFromMock(res, rol_id);
    else
      getRolesByIdFromDB(res, rol_id);
  },

  insertRoles(req, res, next) {
    try {
      const { name, } = req.body;
      // if (!name) {
      //   res.status(consts.codeErrorStatus);
      //   res.send('Please provide valid info');
      //   return;
      // }

      knex('roles').insert({ name })
        .then((rolesInserted) => {
          res.send({ rolesInserted });
        }).catch((err) => {
          helper.controllerErrorRaised('knex trying to insert on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })

    } catch (err) {
      helper.controllerErrorRaised('insertRoles', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  updateRoles(req, res) {
    try {
      const { rol_id } = req.params;
      const { name, } = req.body;

      if (!rol_id) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide a roles id');
        return;
      }

      knex('roles')
        .where('rol_id', rol_id)
        .update({
          name,
        }).then((result) => {
          res.send({ result });
        }).catch((err) => {
          helper.controllerErrorRaised('Knex trying to update on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('updateroles', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  },

  deleteRoles(req, res) {
    try {
      const { rol_id } = req.params;

      if (!rol_id) {
        res.status(consts.codeErrorStatus);
        res.send('Please provide a roles id');
        return;
      }

      knex('roles')
        .where('rol_id', rol_id)
        .del()
        .then((result) => {
          res.send({ result });
        }).catch((err) => {
          helper.controllerErrorRaised('Knex trying to delete on DB', err, consts.typeErrors.DB_ERROR_RAISED, next);
        })
    } catch (err) {
      helper.controllerErrorRaised('deleteRoles', err, consts.typeErrors.CONTROLLER_RAISED, next);
    }
  }
}