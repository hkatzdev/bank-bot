import {
  Airtable,
} from "./deps.ts";

const airtable = new Airtable({
  apiKey: "keyXXXXXXXXXXXXXX",
  baseId: "appXXXXXXXXXXXXXX",
  tableName: "Some table name",
});

export const transfer = async (payer, reciever, amount) => {
  const results = await airtable.select();
};
