import * as functions from 'firebase-functions';
import {dialogflow, Parameters, Suggestions} from 'actions-on-google';
import {FehStats} from "./FehStats";

interface QueryDataParameters extends Parameters {
  name: string;
  rarity?: string;
  level?: string;
  equipment?: string;
}

interface QueryBoonBaneParameters extends Parameters {
  name: string;
}

// TODO init cov.data.fallbackCount: 3
const app = dialogflow();

// TODO create repeat intent

/**
 * Welcome Intent
 */
app.intent('welcome', (conv) => {
  if (!conv.user.last.seen) conv.ask(FehStats.tutorial(conv.user.locale));
  conv.ask(FehStats.greet(conv.user.locale));
  conv.ask(new Suggestions(FehStats.commonSuggestions(conv.user.locale)));
});

/**
 * Help Intent
 */
app.intent('help', conv => {
  conv.ask(FehStats.tutorial(conv.user.locale));
  conv.ask(new Suggestions(FehStats.commonSuggestions(conv.user.locale)));
});

/**
 * Query chara data
 */
app.intent<QueryDataParameters>('query_chara_data', (conv, {name, rarity, level, equipment}) => {
  // console.log(name, rarity, level, equipment);
  const locale = conv.user.locale;

  const rarityKey = rarity || 's5';
  const levelKey = level || 'lv1';
  const isEqp = equipment !== 'unequipped';
  const res = FehStats.getIV(locale, {nameKey: name, rarityKey, levelKey, isEqp});
  conv.ask(res);
  conv.ask(FehStats.isContinue(locale));
  conv.ask(new Suggestions(FehStats.commonSuggestions(conv.user.locale)));
});

/**
 * Query chara boon bane
 */
app.intent<QueryBoonBaneParameters>('query_chara_boon_bane', (conv, {name}) => {
  const locale = conv.user.locale;
  const res = FehStats.getBoonBane(locale, {nameKey: name});
  conv.ask(res);
  conv.ask(FehStats.isContinue(locale));
  conv.ask(new Suggestions(FehStats.commonSuggestions(conv.user.locale)));
});

/**
 * Error handling
 */
app.catch((conv, e) => {
  console.error(e);
  conv.close(FehStats.apologize(conv.user.locale));
});

export const FehIvpedia = functions.https.onRequest(app);
