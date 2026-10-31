function autenticarUsuario(intentoExitoso, intentosFallidos, usuarioActivo) {
  if (!usuarioActivo) {
    return 'CUENTA_INACTIVA';
  }
  if (intentoExitoso) {
    return 'LOGIN_EXITOSO';
  }
  if (intentosFallidos >= 3) {
    return 'CUENTA_BLOQUEADA';
  }
  return 'CREDENCIALES_INVALIDAS';
}

function calcularDescuento(monto, tipoCliente, tieneCupon) {
  if (monto <= 0) {
    return 0;
  }
  let descuento = 0;
  if (tipoCliente === 'VIP') {
    descuento = 0.20;
  } else if (tipoCliente === 'FRECUENTE') {
    descuento = 0.10;
  }
  if (tieneCupon) {
    descuento += 0.05;
  }
  return monto * (1 - descuento);
}

function validarPasswordSegura(password) {
  if (!password || password.length < 8) return false;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneEspecial = /[!@#$%^&*]/.test(password);

  if (!tieneMayuscula) return false;
  if (!tieneNumero) return false;
  if (!tieneEspecial) return false;

  return true;
}

function cambiarEstadoPedido(estadoActual, nuevoEstado) {
  switch (estadoActual) {
    case 'PENDIENTE':
      if (nuevoEstado === 'PROCESANDO' || nuevoEstado === 'CANCELADO') return nuevoEstado;
      break;
    case 'PROCESANDO':
      if (nuevoEstado === 'ENVIADO') return nuevoEstado;
      break;
    case 'ENVIADO':
      if (nuevoEstado === 'ENTREGADO') return nuevoEstado;
      break;
    default:
      return 'TRANSICION_INVALIDA';
  }
  return 'TRANSICION_INVALIDA';
}

function calcularCostoEnvio(pesoKg, zona) {
  if (pesoKg <= 0) return 0;
  let tarifaBase = 10;
  if (zona === 'URBANA') {
    tarifaBase += 5;
  } else if (zona === 'RURAL') {
    tarifaBase += 15;
  }
  if (pesoKg > 10) {
    tarifaBase += (pesoKg - 10) * 2;
  }
  return tarifaBase;
}

module.exports = {
  autenticarUsuario,
  calcularDescuento,
  validarPasswordSegura,
  cambiarEstadoPedido,
  calcularCostoEnvio
};