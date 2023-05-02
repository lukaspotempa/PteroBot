## License 
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
<a href="https://creativecommons.org/licenses/by/4.0/">This work is licensed under a Creative Commons Attribution 4.0 International License.</a>

# Introduction
This is a basic Discord bot to run API commands for Pterodactyl Panel V1 or higher 
alongside with game server monitoring, meaning you can add game servers to the bot
and the bot will refresh information about the game server, for e.g. the current
players listed on the server, using gamedig library. 
Note, that this is my first Discord bot. You might encounter bugs. I'd love for them
to be reported to me directly using Discord or via Github issues.

# Examples
<img src="https://i.imgur.com/kMo6asv.png" />
<img src="https://i.imgur.com/8nLwtyX.png" />
<img src="https://i.imgur.com/ggTbsYU.png" />

# Setup
## Creating the Discord bot
You may either follow this guide, or follow the official in-depth guide provided by Discord.
<a href="https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot">click here</a>

1. To create the Discord bot you need to head to the following page <a href="https://discord.com/developers/applications">click here</a>
and create a new application. 
2. Put in the name, you want the bot to have. 
3. Next, setup the bot as you would like to. 
You can upload a custom image and change the description to fit you.

## Getting the token
1. Once the the bot was created, you may navigate to the **Bot** tab. 
2. A **token** should be displaying. In case it doesn't, press the **reset** button.
3. Now copy the token using the **copy** button. Make sure to keep it a secret!
4. Navigate to the **OAuth2** tab and copy the client id and save both of them. You will need them later on.
The token should look something like this `MTA5OTM0MjkzMzA5MTY4NDQ4NA.GWyEou.QwYuwmJY3CrdWyOWHCeBFGJuvQ2qw7KUJ4qyfA`.

## Inviting the bot and setting up permission
1. Under the **OAuth2** tab, head to the **URL Generator** tab.
2. In the upper panel, select `application.commands` and the `bot` scope. 
3. Now a second panel will open up in the bottom. Either give the
bot the `Administrator` rights or select all of the following:
```
GENERAL PERMISSION
View Audit Log
Manage Server
Manage Channels
Read Messages/View Channels
TEXT PERMISSION
Send Messages
Manage Messages
Embed Links
Read Message History
Add Reactions
Use Slash Commands
```
Next you may press the **Copy** button to copy the URL. Paste the URL into your browser.
Now select the Discord server you want the bot to add to.

## Managing command permissions
1. Navigate to your Discord server. Verify the bot has successfully joined the server. After that,
head to your Discord server settings. 
2. Under **apps** you should find an **integrations** tab or something similar.
Under the **integrations** tab you may now click on the **manage** button next to the bot you just added.
3. You may now configure the bot to your liking. In the following example, I setup the Discord server,
to only allow bot commands inside a certain channel and only by certain roles. 

<img src="https://i.imgur.com/uNit9mH.png">

**Caution! Not assigning roles might risk command usage by unauthorized personnel.**

## Creating the Pterodactyl API keys
First be aware, that there is two different API keys. One is the **application API**
key, which is needed for some basic command usage, like displaying all servers.
Second, there is the **client API** key. The client API key can only contact servers,
to whom the user is registered as owner, inside the Pterodactyl CP. This
key is needed, for e.g. to start and stop server instances. Any interaction
using the client API will be shown as an interaction done by your user account.

### Creating the application API key
1. Head to your Pterodactyl panel.
2. On the Pterodactyl Panel, head to the admin tab.
3. On the admin tab, head to the **Application API** tab on the navigation.
4. Next, create an API key by clicking the **Create New** button.
5. Make sure, to give all 'read' permissions in order for the bot to function properly.
6. In the top right, provide a brief description, for e.g. `Pterodactyl Discord Bot`
and press the **Create credentials** button
Your API key should look something like this `ptla_VmBia0L4YNGvkpixMYDrKJJWw15siaMyWvkgAyXTczL`

### Creating the client API key
1. Head to your panel and use this routing example `https://pterodactyl.app/account/api`
2. Create a brief description of your API key as before and press create
3. Copy the API key shown on the page, it should look something like this
`ptlc_vgsss1QunvCFTJ5ECUEctuJS1NAeiFVPX4xPVXNJ6pI`

## Setting up the config
1. Duplicate the `config.txt` file and change it's name to `config.json`.
2. Put in the required data. This is an example for a config setup properly
```
(Don't bother, none of these keys will work.)
{
  "token": "k8PMC5UJecnG_6bFsJz71GoXpl7Fn2lX",
  "clientId": "236082439564148531",
  "guildId": "891091058465736201",
  "API_Key": "ptla_VmBia0L4YNGvkpixMYDrKJJWw15siaMyWvkgAyXTczL",
  "Client_API_Key": "ptlc_vgsss1QunvCFTJ5ECUEctuJS1NAeiFVPX4xPVXNJ6pI",
  "API_Url": "https://pterodactyl.app/",
  "game_servers": [
    {
      "host": "minecraft-server.net",
      "query_port": "25565",
      "game_type": "minecraft",
      "channel_id": "1097237214935734511"
    },
  ],
  "update_interval": 60000
}
```

To get your guild ID, you need to enable the developer settings in Discord and copy it.
Instructions on how to obtain it, can easily be found online.
You can leave the game servers array empty and add them manually using the /register command once the bot is running.

The bot is ready to be started!

First run `npm run commands` to deploy the commands and make them accessible inside your Discord server.
Provided, you have npm installed, you can now run the bot using `npm start`.
