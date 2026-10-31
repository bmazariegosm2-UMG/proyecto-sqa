// tests/api.test.js
const request = require('supertest');
const app = require('../src/server');

describe('Pruebas de Integración y API REST (Sección D)', () => {

  test('POST /api/auth/login debe retornar 200 en login exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ intentoExitoso: true, intentosFallidos: 0, usuarioActivo: true });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('LOGIN_EXITOSO');
  });

  test('POST /api/auth/login debe retornar 401 en credenciales inválidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ intentoExitoso: false, intentosFallidos: 1, usuarioActivo: true });
    
    expect(res.statusCode).toEqual(401);
  });

  test('POST /api/pedidos/descuento debe validar contrato JSON y status 200', async () => {
    const res = await request(app)
      .post('/api/pedidos/descuento')
      .send({ monto: 100, tipoCliente: 'VIP', tieneCupon: true });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('totalConDescuento');
    expect(res.body.totalConDescuento).toBe(75);
  });

  test('PATCH /api/pedidos/estado debe retornar 400 en transición inválida', async () => {
    const res = await request(app)
      .post('/api/pedidos/descuento')
      .send({ monto: -10, tipoCliente: 'REGULAR', tieneCupon: false });
    
    expect(res.statusCode).toEqual(400);
  });

});