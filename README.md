# CHAITANIO v8 — prototipo interactivo

## Abrir la demo
1. Descomprime `chaitanio-v7.zip`.
2. Abre `chaitanio-v7/index.html` en un navegador moderno (Safari/Chrome).
3. Navega desde la barra inferior. El botón `+` abre las acciones de creación.

## Funciones de demostración
- Navegación entre Inicio, Descubrir, Chat, Perfil, Mapa y Lives.
- Búsqueda local de eventos/personas y filtros de eventos por fecha/ciudad.
- Detalle de eventos y creación de eventos en la lista local de la demo.
- Perfiles y conversaciones simuladas.
- Selector de cuenta personal o empresario; datos básicos del local.
- Publicaciones locales, eventos y panel de empresario.
- Entradas demo, selección de método de pago, historial, solicitudes de devolución, permisos y validación de códigos de demostración.
- Persistencia local de entradas y tipo de cuenta cuando el navegador permite `localStorage`.
- Ajustes de interfaz para móvil y tema oscuro consistente.
- Pantalla de registro/inicio de sesión de demostración, con selección de cuenta personal o empresarial.

## Importante: aún no es una aplicación de producción
Los eventos, perfiles, mensajes, pagos y entradas de esta versión son datos de demostración locales. El formulario de registro/inicio de sesión también es solo una maqueta: no hay autenticación real, servidor, base de datos compartida, pagos bancarios, liquidaciones ni reembolsos reales. Los QR son ilustrativos y no son códigos seguros escaneables. No publiques información real ni uses esto para controlar acceso real.

## Siguiente etapa de desarrollo real
La siguiente tarea técnica es conectar el registro a un backend seguro y una base de datos; el formulario actual no crea cuentas reales.
1. Diseñar API y base de datos (usuarios, empresas, eventos, inventario, pedidos, mensajes y auditoría).
2. Añadir registro/login, verificación de identidad cuando proceda y permisos de servidor por rol.
3. Integrar proveedor de pagos y métodos disponibles por país; validar webhooks y liquidaciones.
4. Crear QR seguros, inventario atómico y protección contra entradas duplicadas.
5. Añadir chat en tiempo real, subida de medios, mapas y vídeo en directo.
6. Pruebas de seguridad, privacidad, accesibilidad y despliegue.

No guardes claves secretas en `app.js` ni en otros archivos del navegador.
