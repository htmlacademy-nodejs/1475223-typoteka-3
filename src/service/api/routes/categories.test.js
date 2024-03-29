'use strict';

const request = require(`supertest`);
const {API_PREFIX, Http} = require(`../../constants`);
const {services} = require(`./`);
const {server, setup, teardown} = require(`../../test-setup`);

const categoryAttrs = {
  name: `Test category`
};

const testUserAttrs = {
  name: `Джон Доу`,
  email: `test@email.com`,
  password: `123456aa`,
  isEditor: true
};


beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});

describe(`Categories api endpoint`, () => {
  let testCategory;
  let testUser;

  beforeEach(async () => {
    await services.users.create(testUserAttrs);
    testUser = await services.users.login(testUserAttrs.email, testUserAttrs.password);
  });

  afterEach(async () => {
    await services.users.logout(testUser.tokens.access);
    await services.users.delete(testUser.id);
  });

  beforeEach(async () => {
    const category = await services.categories.create(categoryAttrs);
    testCategory = (await category.reload()).convertToJSON();
  });

  describe(`GET ${API_PREFIX}/categories`, () => {
    test(`Should return categories list with proper object structure`, async () => {
      const response = await request(server).get(`${API_PREFIX}/categories`);

      const categories = (await services.categories.findAll())
        .map((category) => category.convertToJSON());
      const results = response.body.items;

      expect(categories).toEqual(expect.arrayContaining(results));
      expect(Array.isArray(results)).toBe(true);
      expect(results.length > 0).toBe(true);
      expect(results).toEqual(expect.arrayContaining(categories));
    });
  });

  describe(`POST ${API_PREFIX}/categories`, () => {
    test(`Should create an category`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/categories`)
        .set(`authorization`, testUser.tokens.access)
        .send(categoryAttrs)
        .expect(Http.CREATED);

      const category = response.body;
      expect(category.name).toEqual(categoryAttrs.name);
    });

    test(`Should return 400 error if wrong attributes`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/categories`)
        .set(`authorization`, testUser.tokens.access)
        .send({...categoryAttrs, wrongAttribute: true});

      expect(response.status).toBe(Http.BAD_REQUEST);
    });
  });

  describe(`PUT ${API_PREFIX}/categories/:categoryId`, () => {
    const toUpdate = {
      name: `Общество`
    };

    test(`Should update a category`, async () => {
      let response = await request(server)
        .put(`${API_PREFIX}/categories/${testCategory.id}`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate)
        .expect(Http.OK);

      const updated = response.body;
      expect(updated).toEqual(expect.objectContaining(toUpdate));

      response = await request(server)
        .get(`${API_PREFIX}/categories/${testCategory.id}`)
        .expect(Http.OK);

      const received = response.body;
      expect(updated).toEqual(received);
    });

    test(`Should return 404 error if categoryId is wrong`, async () => {
      const respone = await request(server)
        .put(`${API_PREFIX}/categories/1234`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate);

      expect(respone.status).toBe(Http.NOT_FOUND);
    });
  });

  describe(`DELETE ${API_PREFIX}/categories/:categoryId`, () => {
    test(`Should delete a category`, async () => {
      let response = await request(server)
        .delete(`${API_PREFIX}/categories/${testCategory.id}`)
        .set(`authorization`, testUser.tokens.access)
        .expect(Http.OK);

      const deleted = response.body;
      expect(testCategory).toEqual(expect.objectContaining(deleted));

      response = await request(server).
        get(`${API_PREFIX}/categories/${testCategory.id}`);

      expect(response.status).toBe(Http.NOT_FOUND);
    });

    test(`Should return 404 error if categoryId is wrong`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/categories/1234`)
        .set(`authorization`, testUser.tokens.access);

      expect(response.status).toBe(Http.NOT_FOUND);
    });
  });
});
