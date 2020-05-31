export interface balance {
  id: string;
}

export interface users {
  lower?: number;
  upper?: number;
  amount: number;
  key: string;
}

export interface startAmt {}

export type legacy = {
  send_id: string;
  gp: number;
  token: string;
  reason: string;
} & ({bot_id: string} | {give_id: string});
