// Tipado de funciones (Parametros y Retorno)
// Funcion con tipos explicitos en parametros y valor de retorno
function processUserPayment(amount: number, currency: string): boolean {
  if(amount <= 0) {
    console.log(`Payment not processed ${amount} the value is negative`);
    return false;
  }

  console.log(`Processing payment of ${amount} ${currency}`);
  return true;
}
const isPaymentSuccessful: boolean = processUserPayment(150.50, "USD");
const isPaymentNotSuccessful: boolean = processUserPayment(-50, "USD");

console.log("\n=================================================");

// Parametros opcionales por defecto
// 'taxRate' es opcional (pueden ser number o undefined)
// 'currency' tiene un valor pro defecto
function calculateTotal(subtotal: number, taxRate?: number, currency: string = "USD"): string {
  const finalTax = taxRate !== undefined ? taxRate : 0;
  const total = subtotal + (subtotal * finalTax);

  return `Total ${total} ${currency}`;
}

console.log(calculateTotal(100))
console.log(calculateTotal(50, 0.15))
console.log(calculateTotal(180, 0.12, "EURO"))

console.log("\n=================================================");

// Tipado basico de clases
class UserRepository {
  // Propiedad de solo lectura (No puede ser modificada despues de inicializarse)
  private readonly databaseName: string = "MainDatabase";

  // Propiedad privada (Solo es accesible dentro de esta clase)
  private activeConnections: number = 0;

  constructor(public serverUrl: string) {
    this.connect();
  }

  // Metodo privado que no retorna nada (void)
  private connect(): void {
    this.activeConnections++;
    console.log(`Connected to ${this.databaseName} at ${this.serverUrl}`)
  }

  // Metodo publico que retorna un numero
  public getActiveConnections(): number {
    return this.activeConnections;
  }
}

// Instanciamos la clase 
const repository = new UserRepository("https://api.mycompany.com");
console.log(`Server URL: ${repository.serverUrl}`);
console.log(`Active connections: ${repository.getActiveConnections()}`);



