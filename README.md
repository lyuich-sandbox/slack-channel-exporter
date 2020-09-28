For the latest information, please refer to the [Japanese version](README.ja.md)

## About

This script exports threads for a specific channel in Slack to the Google SpreadSheet.

## Environment

- Google Apps Script (Installable triggers with Google SpreadSheet)

## Installation

1. Open https://docs.google.com/spreadsheets/d/1VclRGzDgpEKyFYHKzmdtyFaJrrBOG0EgDavxc9sZcxM/edit?usp=sharing
- File > Make a copy... 
- Tools > Script editor (Then it opens Google Apps Script editor) 
- File > Project properties
- Script properties > Add rows
    - TOKEN: Slack API token (You can get token: https://api.slack.com/custom-integrations/legacy-tokens)
    - CHANNEL: Slack channel ID
- Save
- Select function
    - select main function
- Select play button
- You can show slack channel messages on Google spreadsheet
