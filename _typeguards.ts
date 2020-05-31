export interface Balance {
  id: string;
}

export const isBalance = (object: unknown): object is Balance => {
  return object && typeof (object as Balance).id === "string";
};

export interface Users {
  lower?: number;
  upper?: number;
}

export const isUsers = (object: unknown): object is Users => {
  if (!object) return false;
  const tester = object as Users;
  return object && (!tester.lower || typeof tester.lower === "number") &&
    (!tester.upper || typeof tester.upper === "number");
};

export interface StartAmt {}

export const isStartAmt = (object: unknown): object is StartAmt => {
  return !!object;
};

export interface Payment {
  payer: string;
  receiver: string;
  amount: number;
  key: string;
  reason?: string;
}

export const isPayment = (object: unknown): object is Payment => {
  if (!object) return false;
  const tester = object as Payment;
  return typeof tester.payer === "string" &&
    typeof tester.receiver === "string" &&
    typeof tester.amount === "number" && typeof tester.key === "string" &&
    (!tester.reason || typeof tester.reason === "string");
};

export interface Legacy {
  bot_id: string;
  send_id: string;
  gp: number;
  token: string;
  reason?: string;
}

export const isLegacy = (object: unknown): object is Legacy => {
  if (!object) return false;
  const tester = object as Legacy;
  if (typeof tester.bot_id !== "string") {
    const old = (object as { give_id: string }).give_id;
    if (typeof old !== "string") return false;
    tester.bot_id = old;
  }
  return typeof tester.send_id === "string" && typeof tester.gp === "number" &&
    typeof tester.token === "string" &&
    (!tester.reason || typeof tester.reason === "string");
};
