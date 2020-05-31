export interface Balance {
  id: string;
}

export interface Users {
  lower?: number;
  upper?: number;
  amount: number;
  key: string;
}

export interface StartAmt {}

export interface Payment {
  payer: string;
  receiver: string;
  amount: number;
  key: string;
  reason?: string;
}

export interface Legacy {
  bot_id: string;
  send_id: string;
  gp: number;
  token: string;
  reason?: string;
}

function isLegacy(object: unknown): unknown is Legacy {
  const tester = object as Legacy;
  if (typeof tester.bot_id !== "string") {

  }
  return typeof tester.send_id === "string" && typeof tester.gp === "number" && typeof tester.token === "string" && (!tester.reason || typeof tester.reason === "string") && ((tester.bot_id! && typeof tester.bot_id === "string") || typeof tester.give_id === "string");
}

const safeJson = <T>(object: unknown): object is T => {

  return (pet as Fish).swim !== undefined;
};
