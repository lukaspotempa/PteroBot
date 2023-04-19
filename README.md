## License 

# Introduction
This is a basic Discord bot to run API commands for Pterodactyl Panel V1 or higher 
alongside with game server monitoring, meaning you can add game servers to the bot
and the bot will refresh information about the game server, for e.g. the current
players listed on the server, using gamedig library. 

# Setup
## Creating the Discord bot
To create the Discord bot you need to head to the following page https://discord.com/developers/applications
and create a new application. Put in the name, you want the bot to have. Next, setup the bot as you would
like to. You can upload a custom image and change the description to fit you.

## Inviting the bot and setting up permission
Once the the bot was created, you may navigate to the `OAuth2` tab. Next click onto `URL Generator`.
In the upper panel, select `application.commands` and the `bot` scope. Now a second panel will
open up in the bottom. Either give the bot the `Administrator` rights or select all of the following:
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
Next you may press the `Copy` button, copy the URL and paste the URL into your browser.
Now select the Discord server you want the bot to add to.

## Managing command permissions
Next, navigate to your Discord server. Verify the bot has successfully joined the server. After that,
head to your Discord server settings. Under `apps` you should find `integrations` or something similar.
Under the `integrations` tab you may now click on the `manage` button next to the bot you just added.
You may now configure the bot to your liking. In the following example, I setup the Discord server,
to only allow bot commands inside a certain channel and only by certain roles. 

<img src="https://i.imgur.com/uNit9mH.png">

Caution! Not assigning roles might risk unwanted command usage by non authorized personnel.

## Examples