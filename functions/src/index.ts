import * as functions from 'firebase-functions';
import {dialogflow, Parameters} from 'actions-on-google';
import {FehStas} from "./FehStats";

interface QueryParameters extends Parameters {
  name: string;
  rarity?: string;
  level?: string;
  equipment?: string;
}

// TODO init cov.data.fallbackCount: 3
const app = dialogflow();

// TODO create help intent
// TODO create repeat intent

/**
 * Welcome Intent
 */
app.intent('welcome', (conv) => {
  if (!conv.user.last.seen) conv.ask(FehStas.tutorial(conv.user.locale));
  conv.ask(FehStas.greet(conv.user.locale));
});

/**
 * Help Intent
 */
app.intent('help', conv => {
  conv.ask(FehStas.tutorial(conv.user.locale));
});

/**
 * Query chara data
 */
app.intent<QueryParameters>('query_chara_data', (conv, {name, rarity, level, equipment}) => {
  // console.log(name, rarity, level, equipment);
  const locale = conv.user.locale;

  const rarityKey = rarity || 's5';
  const levelKey = level || 'lv1';
  const isEqp = equipment !== 'unequipped';
  const res = FehStas.getIV(locale, {nameKey: name, rarityKey, levelKey, isEqp});
  conv.ask(res);
  conv.ask(FehStas.isContinue(locale));
});

/**
 * Error handling
 */
app.catch((conv, e) => {
  console.error(e);
  conv.close(FehStas.apologize(conv.user.locale));
});

export const FehIvpedia = functions.https.onRequest(app);
