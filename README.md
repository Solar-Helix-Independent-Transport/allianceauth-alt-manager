# Alt Manager

Alt corp management automation tool. Including tracking of member corporations in or out of allainces and allowing multiple targets for "alt sanctioning"

## Features
- Configurable "Member Corps" that may not link to auth states.
- Alt Corp Claim Sanctioning with configurable targets.
- Persistent history of sanctions and actors.
- Listing of characters that are not known to auth for easy identification.
- Configurable alt corp "Targets".
  - Allows HTML in the description.
  - Configurable discord messages to be sent when aprooved, with full embed formatting.
  - Configurable options to allow members attached to mains not in member corporations.
- Automatic flagging/revoke when not all members are loaded.
- Automatic flagging/revoke if some memebrs are not from a memebr corp for specific targets.
- Discord notifications (DM and channel) for most actions along the way
- Discord cog:
  - List member corps.
  - Explain corp - outputs the full diagnostics of a corp.
- Smart filter for "Main in a configured member corp"

## Installation 
- App name is `altmanager`
- this is an in development app, if you cant figure out the rest this is probably not for you just yet. But feel free to poke on the discord.

## Contributions
Make sure you have signed the [License Agreement](https://developers.eveonline.com/resource/license-agreement) by logging in at https://developers.eveonline.com before submitting any pull requests. All bug fixes or features must not include extra superfluous formatting changes, if you want to do a big code-reformat put it in a separate commit/PR.
