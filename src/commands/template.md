# Duke 2.0

## Command Template

Below lies the command template for Duke 2.0

```js
module.exports.callback = ({ insert variables here }) => {
    // insert code here
}

module.exports.config = {
    name: '',
    aliases: [] // or ''
    category: '',
    description: '',
    permissions: [],
    clientPerms: [],
    isVoice: false,
    isNSFW: false,
    isDev: false
}
```

## Command Variables

| Variable  | Description                                              |
| --------- | -------------------------------------------------------- |
| args      | These are the arguments that went along with the command |
| client    | The client or bot object                                 |
| message   | This is your typical message object                      |
| guildData | This is the data we got from the database for the guild  |
| userData  | This is the data we got from the database for the author |
