# TheBlackSide243 · Feather / AltStore source

Le mie app per iPhone in un'unica sorgente · My iPhone apps in one source.

```
https://raw.githubusercontent.com/TheBlackSide243/feather-repo/main/apps.json
```

## 🇮🇹 Italiano

**Aggiungerla**: in Feather vai su Fonti → **+** e incolla l'indirizzo qui sopra (in AltStore: Sorgenti → +). Le nuove versioni compaiono da sole.

| App | Cos'è | Codice e release |
|---|---|---|
| **openGym Plus** | Versione non ufficiale di [openGym](https://github.com/DuarteSantos8/openGym) con funzioni in più | [TheBlackSide243/openGym](https://github.com/TheBlackSide243/openGym/releases) (ramo `plus`) |
| **Wardrowbe** | App iPhone per il tuo server [Wardrowbe](https://github.com/Anyesh/wardrowbe) | [TheBlackSide243/wardrowbe](https://github.com/TheBlackSide243/wardrowbe/releases) (release `ios-*`) |

Questo repo contiene solo l'elenco e le icone: le `.ipa` stanno nelle release di ogni progetto.

**Una nuova versione**: dopo la release del progetto, `node update.mjs <bundleIdentifier> <versione> <file.ipa>`, poi commit e push di `apps.json`.

**Una nuova app**: aggiungi in `apps.json` un'app con gli stessi campi delle altre (nome, `bundleIdentifier`, sviluppatore, icona in `icons/`, descrizione, sottotitolo, colore, `appPermissions: {}` e almeno una versione), e in `apps.config.json` l'indirizzo di download con `{version}`. `node update.mjs --check` controlla che non ci siano campi in più: Feather sull'iPhone rifiuta la sorgente se ci sono numeri di build, iOS minimo, permessi o categoria.

**Mai rinominare o spostare `apps.json`**: Feather tiene l'indirizzo da cui l'hai aggiunta.

## 🇬🇧 English

**Adding it**: in Feather go to Sources → **+** and paste the address above (in AltStore: Sources → +). New versions show up on their own.

The apps are listed in the table above. This repo holds only the list and the icons; the `.ipa` files are in each project's releases.

**A new version**: after the project's release, `node update.mjs <bundleIdentifier> <version> <file.ipa>`, then commit and push `apps.json`.

**A new app**: add an app to `apps.json` with the same fields as the others (name, `bundleIdentifier`, developer, an icon in `icons/`, description, subtitle, colour, `appPermissions: {}` and at least one version), and its download address with `{version}` to `apps.config.json`. `node update.mjs --check` checks there are no extra fields: Feather on the iPhone refuses the source with build numbers, minimum iOS, permissions or a category.

**Never rename or move `apps.json`**: Feather keeps the address you added it from.
