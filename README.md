# Ticket Fee Updater

This is a simple example of a script that

- Logs in using an API Key and Secret
- Listens to account events, filtering for ticket events
- Checks the amount of the ticket
- If greater than 1000, change the fee to 0

## Install

`npm install`

# Start

`npm run start`

# TODOS

- Add Keep Alive for session
- Add reconnect logic (check for unhandled tickets)
- Add per product configs for threshholds and notional vs absolute amounts
- Add comments to the ticket to create an audit trail of why the ticket was updated
