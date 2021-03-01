# Cy Duke > 2.0 Changelog

There were a lot of changes, below is the list of all the changes. Have fun reading...

## Day 1

-   Setup the project files `.env`, `.env.example`, `.gitignore`, `.gitattributes`, `package.json`, `LICENSE`, `.eslintrc.json`
-   Bot Keys have been made into environment variables, this means they aren't stored randomly throughout the bot. Visit `.env.example` to check all them out
-   Bot has added room for sharding file in the form of `index.js` while the main bot file is located at `src/client.js`
-   `src/tools.js` if a function holder for all utilities. check out `src/utils/` for all actual utils/functions
-   Startup logs look a lot cleaner and easier to read
-   There is now a less commando looking command handler
-   The command manager will automatically load new commands in new directories. Nn more of a need to add it into the mess which is categorization
-   The listener (event) manager does the same as the command manager now leaving for better looking listener structures and cleaner files
-   Database is connected more securely and less stupidly

## Day 2

-   The `src/listeners/discord/message.js` or message event has been rewritten and is fully functional
-   Command structure has been finalized
-   `src/commands/template.md` has been created to show the full command template without showing itself to the command manager
-   Throwing a lot more errors and checks for functions on Duke before
-   Mocked up top.gg extension to post the bots stats
-   Organized the mess of images on the original bot
-   Setup assets folder
-   Created `assets/config.json` and `assets/colors.json`
-   Database events `src/listeners/database/connect` and `src/listeners/database/error` were created
-   Remade `src/modules/guild`

## Day 3

-   Tested the TOP.GG extension to post the bots stats
-   Remade `src/modules/globals`, `src/modules/user`, and `src/modules/member`
-   Added invite link tracking
-   Added activity
-   Remade `src/listeners/discord/guildCreate` and `src/listeners/discord/guildDelete`
-   Message event now checks for disabled categories
-   Message event also now does leveling
-   Mentioning the bot now gives a response
-   Copied over player files
-   Now loading music events and setup clients music

## Day 4

-   Started remaking logs finished the following events below
    -   roleCreate
    -   roleDelete
    -   emojiCreate
    -   emojiDelete
    -   channelCreate
    -   channelDelete
    -   inviteCreated
    -   inviteDelete
    -   messageDelete
-   Created `toTitleCase` function
-   Added Leader Board functions
-   Added background image
-   Added response images for the actions that use links
-   Started creating action commands
    -   Boop
    -   Kill
    -   Cookies
    -   Drop Anvil
-   Removed emojis from config
-   Updated Command Template to include usage

## Day 5

-   Setup guild member logs
-   Setup guild Update logs
-   Setup messageUpdate logs
-   Changed Message Deleted logs

## Day 6

-   Removed unnecessary variable in guildMemberAdd event
-   More Action Commands
    -   Love
    -   Pinky Promise
    -   Punch
    -   Shoot

## Day 7

-   Fixed "kill" message instead of the real command
-   More More Action Commands
    -   Feed
    -   Hug
    -   Kiss
    -   Pat
    -   Poke
    -   Nuzzle
    -   Slap
    -   Tickle
-   Added Music Commands
    -   Play
    -   Filters
    -   Loop
    -   Play
    -   Pause

## Day 8

-   Updated player events (They are now setup properly the way the were written and documented to be...)
-   Updated player messages

## Day 9

-   More Music Commands
    -   Wipe Filters
    -   Clear Queue
    -   Lyrics
    -   Now Playing
    -   Queue
    -   Resume
    -   Search
    -   Shuffle
    -   Skip
    -   Stop
    -   Volume
