const meta = require('./meta')

import threads from '../pages/threads/threader'
const threader = function () {
  const path = (meta.env === "dev" ?
    './src/pages/threads/threads_input_TEST.yaml' :
    './src/pages/threads/threads_input.yaml')
  return threads(path, "saint_loup", false, 6000)
}
module.exports =
  (meta.twitterThread === "false" || !threader ?
    [{ "title": "fonctionnalité désactivée" }] :
    threader
  )

//todo : supprimer ou améliorer "message vide"
//todo : supprimer auteurs sauf si QT est /== de saint_loup
//todo : tag "QT" en dessous de la date
//todo : diminuer line height si QT
//todo : gérer les fetch annulés https://javascript.info/fetch-abort
//todo : exemple https://twitter.com/Saint_loup/status/1384527253367894016
//todo : ajouter ancres aux hx
//TODO : arrêter les requêtes si tweet_id = tweet déjà en cache (pas juste le tout premier tweet)
//TODO : remonter la chaine uniquement si author=saint_loup
//TODO : compteur de requêtes pour ne jamais dépasser le rate limit
//TODO : card twitter dans <head>
//TODO : Ré-héberger images
//TODO : check si cache est inutilisable.
//TODO : "tweet cité" : gérer pluriels

/* [build:eleventy]   status: 429,
[build:eleventy]   statusText: 'Too Many Requests',
[build:eleventy]   headers: {
[build:eleventy]     'api-version': '2.55',
[build:eleventy]     'cache-control': 'no-cache, no-store, max-age=0',
[build:eleventy]     connection: 'close',
[build:eleventy]     'content-disposition': 'attachment; filename=json.json',
[build:eleventy]     'content-encoding': 'gzip',
[build:eleventy]     'content-length': '94',
[build:eleventy]     'content-type': 'application/json; charset=utf-8',
[build:eleventy]     date: 'Sun, 04 Dec 2022 23:03:47 UTC',
[build:eleventy]     perf: '7626143928',
[build:eleventy]     server: 'tsa_f',
[build:eleventy]     'set-cookie': 'guest_id=v1%3A167019502791388356; Max-Age=34214400; Expires=Thu, 04 Jan 2024 23:03:47 GMT; Path=/; Domain=.twitter.com; Secure; SameSite=None',
[build:eleventy]     'strict-transport-security': 'max-age=631138519',
[build:eleventy]     'x-access-level': 'read',
[build:eleventy]     'x-connection-hash': '6e3d02eff4c2dbd7ec148ea546458df8d40ec79af5ccd18f57f34ddd0abe5f7a',
[build:eleventy]     'x-content-type-options': 'nosniff',
[build:eleventy]     'x-frame-options': 'SAMEORIGIN',
[build:eleventy]     'x-rate-limit-limit': '300',
[build:eleventy]     'x-rate-limit-remaining': '0',
[build:eleventy]     'x-rate-limit-reset': '1670195259',
[build:eleventy]     'x-response-time': '110',
[build:eleventy]     'x-transaction-id': '1f254eb9d714fc2d',
[build:eleventy]     'x-xss-protection': '0'
[build:eleventy]   },
[build:eleventy]   error: {
[build:eleventy]     title: 'Too Many Requests',
[build:eleventy]     detail: 'Too Many Requests',
[build:eleventy]     type: 'about:blank',
[build:eleventy]     status: 429
[build:eleventy]   }
[build:eleventy] } */


/*[build:eleventy] TypeError: terminated
[build:eleventy]     at Fetch.onAborted(node: internal / deps / undici / undici: 6970: 53)
[build:eleventy][cause]: Error: unexpected end of file
[build:eleventy]       at Zlib.zlibOnError[as onerror](node: zlib:189:17) {
[build: eleventy]     errno: -5,
  [build: eleventy]     code: 'Z_BUF_ERROR'
  [build:eleventy]
}
[build: eleventy] }*/
