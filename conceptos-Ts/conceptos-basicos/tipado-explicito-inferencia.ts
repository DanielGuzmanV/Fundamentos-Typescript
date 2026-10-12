// 1. Inferencia automatica en variables simples
let userName = "Marcus";
let useAge = 26;
const ACCESS_TOKEN_TTL = 3600; // Inferred as: number
const IS_CACHE_ENABLED = true; // Inferred as: boolean
let listCourtesies = ["How is it going?", "Have a good day", "Please", "Tank you / Thanks", "You're welcome", "Excuse me"];

// Inferencia en funciones (Ts deduce lo que retorna el codigo de la fn)
function calculateSubtotal(price: number, quantity: number) {
  return price * quantity;
}

// ======================================================================

// 2 Tipado explicito, la usamos cuando la variable se declara sin valor inicial
let currentUserRole: string;
currentUserRole = "ADMIN"; // Le damos un valor
let activeSession: boolean;
activeSession = true; // le damos un valor
let listGreetings: string[] = ["Good morning", "Good afternoon", "Good evening", "Good night"];

// Tipos especiales:
// void: la funcion no retorna nada, solo envia una respuesta al cliente
function sendGreating(greating: string): void {
  console.log(`Hello, ${listGreetings[0]}: ${greating}`)
}

sendGreating('Marcus');

// Funcion donde retornara un tipo de dato, en este caso un string
function sendError(message: string): string {
  console.log(`Error ${message}`);
  return "Invalid Data";
}

// never: Esta funcion detiene el proceso si no hay conexion
function criticalError(): never {
  throw new Error("Base de datos desconectada");
}

function formatProductCode(code: string | number): string {
  return `CODE-${code}`;
}

console.log('\n--- Prueba 1 ---');
console.log(`Prueba 1 de [formatProductCode]: ${formatProductCode('Codigo')}`);
console.log(`Prueba 2 de [formatProductCode]: ${formatProductCode(2300)}`);


// Manejo de datos externos con unknown
let rawApiResponse: unknown;
rawApiResponse = {status: 200};

// Si intentamos usar la variable unknown nos saldra un error
// console.log(rawApiResponse.status)

// Para usar unknown: debemos verificar de que tipo es
function getDataUnknown(data: unknown): string {
  if(typeof data === 'object' && data !== null) {
    return "Valid object Dat received";
  } else if(typeof data === 'string') {
    return `Processing string: ${data.toUpperCase()}`;
  }
  else {
    return sendError("Invalid ID");
  }
}

console.log('\n--- Prueba 2 ---');
console.log(`Prueba 1 de [getDataUnknown]: ${getDataUnknown(rawApiResponse)}`)
console.log(`Prueba 2 de [getDataUnknown]: ${getDataUnknown(listCourtesies[1])}`)

// Manejo de datos con unknown usando type guard personalizados
let newApiRes: unknown;
newApiRes = { status: 200, message: "OK"};

// Definimos la interfaz 
interface ApiResponse {
  status: number;
  message: string;
}

// Type Guard personalizado
function isValidApiResponse(data: unknown): data is ApiResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'status' in data &&
    typeof (data as Record<string, unknown>).status === 'number'
  );
}

// Funcion donde se usara el type guard
function processApiResponse(data: unknown) {
  if(isValidApiResponse(data)) {
    console.log("Status:", data.status);
    console.log("Message:", data.message.toUpperCase());
  } else {
    console.log("Invalid API response format");
  }
}

processApiResponse(newApiRes);

console.log("\n========================================");

// 3. Tipado explicito en colecciones 
// Array de strings: Almacena permisos especificos
const activePermissions: string[] = ["read:users", "write:reports"];

// Mapa (Record): Almacena sesiones activas en memoria
const activeSessions: Record<string, {token: string; expiresAt: number}> = {
  "user_123": {
    token: "kadjfahsdfjasd",
    expiresAt: 122134
  }
}