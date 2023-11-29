const request = require('supertest');
const app = require('../index');
const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/Users');

describe('GET /api', () => {
  it('responds with the welcome message', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to the API!' });
  });
});

describe('POST /api/register', () => {
  it('should return status code 201 and register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        login: 'testuser',
        password: 'password',
        name: 'Test',
        surname: 'User',
        user_level: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body).toHaveProperty('data');
  });
});

describe('POST /api/login', () => {
  it('should return a JSON Web Token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        login: 'testuser',
        password: 'password',
      });
  
    expect(response.body).toHaveProperty('token');
  });
  it('should return an error if the user does not exist', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        login: 'nonExistUser',
        password: 'errorPass',
      });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Foydalanuvchi Topilmadi');
  });

  it('should return an error if the password is incorrect', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        login: 'testuser',
        password: 'errorPass',
      });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Parol Xato');
  }); 
});

afterAll(async () => {
  await mongoose.connection.close();
});
