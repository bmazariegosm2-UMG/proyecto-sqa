// src/server.js
const express = require('express');
const {
  autenticarUsuario,
  calcularDescuento,
  validarPasswordSegura,
  cambiarEstadoPedido,
  calcularCostoEnvio
} = require('./businessLogic');

const app = express();
app.use(express.json());

// Endpoint 1: Autenticación
app.post('/api/auth/login', (req, res) => {
  const { intentoExitoso, intentosFallidos, usuarioActivo } = req.body;
  const resultado = autenticarUsuario(intentoExitoso, intentosFallidos, usuarioActivo);
  if (resultado === 'LOGIN_EXITOSO') {
    return res.status(200).json({ status: 'success', message: resultado });
  }
  return res.status(401).json({ status: 'error', message: resultado });
});

// Endpoint 2: Cálculo de Descuentos
app.post('/api/pedidos/descuento', (req, res) => {
  const { monto, tipoCliente, tieneCupon } = req.body;
  if (monto <= 0) {
    return res.status(400).json({ error: 'Monto debe ser mayor a cero' });
  }
  const total = calcularDescuento(monto, tipoCliente, tieneCupon);
  return res.status(200).json({ montoOriginal: monto, totalConDescuento: total });
});

// Endpoint 3: Validación de Password
app.post('/api/usuarios/validar-password', (req, res) => {
  const { password } = req.body;
  const esValida = validarPasswordSegura(password);
  return res.status(200).json({ password, esValida });
});

// Endpoint 4: Cambiar Estado de Pedido
app.patch('/api/pedidos/estado', (req, res) => {
  const { estadoActual, nuevoEstado } = req.body;
  const resultado = cambiarEstadoPedido(estadoActual, nuevoEstado);
  if (resultado === 'TRANSICION_INVALIDA') {
    return res.status(400).json({ error: 'Transición no permitida' });
  }
  return res.status(200).json({ estadoAnterior: estadoActual, nuevoEstado: resultado });
});

// Solo levantar el puerto si se ejecuta directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor de calidad corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;