t's an altered version of this project https://github.com/telegraf/telegraf made for GAS by @devin2048

## Setup clasp

### Install Clasp globally

```
npm install @google/clasp -g
```

### Clasp login

This command logs in and authorizes management of your Google account's Apps Script projects. Once it is run, you are asked to sign into a Google account where your Apps Script projects are stored.

```
clasp login
```

A `.clasp.json` file storing the script ID.
An `appsscript.json` project manifest file containing project metadata.

You can get further details from https://developers.google.com/apps-script/guides/clasp#new-editor

Update `.clasp.json` file like this

```
{
  "rootDir": "src",
  "scriptId": "<Script id from app script>"
}

```

## Intall dependencies

```
npm i
```

## Push code while updating

```
clasp push --watch
```

You can deploy this project as library and use in other projects by importing as library using script id.
