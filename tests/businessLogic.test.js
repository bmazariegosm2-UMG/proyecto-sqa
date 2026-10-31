const {
  autenticarUsuario,
  calcularDescuento,
  validarPasswordSegura,
  cambiarEstadoPedido,
  calcularCostoEnvio
} = require('../src/businessLogic');

describe('Pruebas Unitarias - Métodos Críticos (Caja Blanca)', () => {

  test('autenticarUsuario cubre todas las ramas de estado de cuenta', () => {
    expect(autenticarUsuario(true, 0, false)).toBe('CUENTA_INACTIVA');
    expect(autenticarUsuario(true, 0, true)).toBe('LOGIN_EXITOSO');
    expect(autenticarUsuario(false, 3, true)).toBe('CUENTA_BLOQUEADA');
    expect(autenticarUsuario(false, 1, true)).toBe('CREDENCIALES_INVALIDAS');
  });

  test('calcularDescuento valida reglas de negocio y montos límites', () => {
    expect(calcularDescuento(-10, 'VIP', true)).toBe(0);
    expect(calcularDescuento(100, 'VIP', true)).toBe(75);
    expect(calcularDescuento(100, 'FRECUENTE', false)).toBe(90);
    expect(calcularDescuento(100, 'REGULAR', false)).toBe(100);
  });

  test('validarPasswordSegura verifica criterios OWASP', () => {
    expect(validarPasswordSegura('Short1!')).toBe(false);
    expect(validarPasswordSegura('sinmayuscula1!')).toBe(false);
    expect(validarPasswordSegura('SINNUMERO!')).toBe(false);
    expect(validarPasswordSegura('SinEspecial1')).toBe(false);
    expect(validarPasswordSegura('Password123!')).toBe(true);
  });

  test('cambiarEstadoPedido valida transiciones válidas e inválidas', () => {
    expect(cambiarEstadoPedido('PENDIENTE', 'PROCESANDO')).toBe('PROCESANDO');
    expect(cambiarEstadoPedido('PROCESANDO', 'ENVIADO')).toBe('ENVIADO');
    expect(cambiarEstadoPedido('ENVIADO', 'ENTREGADO')).toBe('ENTREGADO');
    expect(cambiarEstadoPedido('PENDIENTE', 'ENTREGADO')).toBe('TRANSICION_INVALIDA');
  });

  test('calcularCostoEnvio aplica tarifas por zona y recargos por peso', () => {
    expect(calcularCostoEnvio(0, 'URBANA')).toBe(0);
    expect(calcularCostoEnvio(5, 'URBANA')).toBe(15);
    expect(calcularCostoEnvio(5, 'RURAL')).toBe(25);
    expect(calcularCostoEnvio(12, 'URBANA')).toBe(19);
  });

});