'use strict';

const {Router} = require(`express`);
const _ = require(`lodash`);
const router = new Router();
const api = require(`../api-services`);

const categoriesRoute = (_app) => {
  router.get(`/`, async (_req, res) => {
    res.render(`pages/all-categories`);
  });

  router.post(`/`, async (req, res) => {
    const attrs = _.omit(req.body, `_csrf`);
    try {
      await api.categories.create(attrs);
    } catch (err) {
      res.render(`pages/all-categories`, {errors: {create: err.response.data}, old: {create: req.body}});
      return;
    }

    res.redirect(`/categories`);
  });

  router.post(`/update/:id`, async (req, res) => {
    const {id} = req.params;

    try {
      await api.categories.update(id, req.body);
    } catch (err) {
      res.render(`pages/all-categories`, {errors: {update: {id: +id, ...err.response.data}}, old: {update: req.body}});
      return;
    }

    res.redirect(`/categories`);
  });

  router.post(`/delete/:id`, async (req, res) => {
    const {id} = req.params;

    try {
      await api.categories.delete(id);
    } catch (err) {
      res.render(`pages/all-categories`, {errors: {delete: {id: +id, msg: err.response.data}}});
      return;
    }

    res.redirect(`/categories`);
  });

  return router;
};

module.exports = categoriesRoute;
