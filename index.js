const { APEX } = require('apex-api');
const crypto = require('crypto');
const { URL, UserId, APIKey, APISecret } = require('./config.json');
const apex = new APEX(URL);

const hmac = crypto.createHmac('sha256', APISecret);
const creds = {
  Nonce: `${Date.now()}`,
  APIKey,
  Signature: '',
  UserId
};
creds.Signature = hmac
  .update(`${creds.Nonce}${creds.UserId}${creds.APIKey}`)
  .digest('hex');

// Add your logic here for how you want to update your tickets based on what threshholds
const handleWithdrawTicket = async (ticket) => {
  if (ticket.Amount > 1000 && ticket.FeeAmt !== 0) {
    console.log(ticket);
    ticket.FeeAmt = 0;
    const update_response = await apex.RPCPromise(
      'UpdateWithdrawTicket',
      ticket
    );
    const update = JSON.parse(update_response.o);
    console.log(update);
  }
};
const main = async () => {
  try {
    const { Authenticated } = await apex.AuthenticateUser(creds);
    if (Authenticated) {
      // I am just looking at withdraw tickets, but you could do this for deposit as well, by changing the filter
      apex.ws
        .filter((x) => x.n === 'WithdrawTicketUpdateEvent')
        .map((x) => JSON.parse(x.o))
        .subscribe(handleWithdrawTicket);
      const sub_response = await apex.RPCPromise(
        'SubscribeAllAccountEvents',
        {}
      );
      const sub = JSON.parse(sub_response.o);
      console.log(sub);
    }
  } catch (e) {
    console.log(e);
  }
};
main();
