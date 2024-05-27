var User = require('../models/User');
var csv = require('csvtojson');
const moment = require('moment');

const importUser = async (req, res) => {
  try {
    const users = await csv().fromFile(req.file.path);
    console.log('Parsed CSV Data:', users);

    // Convert amounts and prices to numbers
    const formattedUsers = users.map(user => ({
      user_id: user.User_ID,
      utc_time: moment(user.UTC_Time, 'DD-MM-YYYY HH:mm').toDate(), // Parse date
      operation: user.Operation,
      base_coin: user.Market.split('/')[0],
      quote_coin: user.Market.split('/')[1],
      amount: parseFloat(user['Buy/Sell Amount']),
      price: parseFloat(user.Price),
    }));

    await User.insertMany(formattedUsers);
    console.log('Data successfully inserted into MongoDB.');

    res.send({status: 200, success: true, msg: 'CSV Imported'});
  } catch (error) {
    console.error('Error importing CSV:', error);
    res.send({status: 400, success: false, msg: error.message});
  }
};

const getBalance = async (req, res) => {
  const timestamp = moment(req.body.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate();
  console.log('Requested timestamp:', timestamp);

  try {
    const trades = await User.find({ utc_time: { $lt: timestamp } });
    console.log('Trades before timestamp:', trades);

    const balances = trades.reduce((acc, trade) => {
      const { base_coin, amount, operation } = trade;
      console.log('Processing trade:', { base_coin, amount, operation });

      if (!acc[base_coin]) {
        acc[base_coin] = 0;
      }
      acc[base_coin] += operation.toLowerCase() === 'buy' ? amount : -amount;
      console.log('Updated balances:', acc);

      return acc;
    }, {});

    console.log('Final calculated balances:', balances);
    res.status(200).json(balances);
  } catch (err) {
    console.error('Error fetching balance:', err);
    res.status(500).send('Error fetching balance');
  }
};

module.exports = {
  importUser,
  getBalance
};

