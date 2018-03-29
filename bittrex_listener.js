var mysql = require('mysql');
const bittrex = require('./node.bittrex.api');

var multiplier = 100000000;

var con = mysql.createConnection({
  host: "0.0.0.0",
  port: "3306",
  user: "root",
  password: "lmao22",
  database: "Askip_toolTradingBox"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

bittrex.options({
  verbose: true,
  websockets: {
    onConnect: function() {
      console.log('onConnect fired');
      bittrex.websockets.listen(function(data, client) {
        if (data.M === 'updateSummaryState') {
          data.A.forEach(function(data_for) {
            data_for.Deltas.forEach(function(marketsDelta) {
              //console.log('Ticker Update for '+ marketsDelta.MarketName, marketsDelta);
              var sql = "INSERT INTO ticker(id_bot, marketName, bid,ask,last, high, low, \
                volume, base_volume, open_buy_orders, open_sell_orders, moy_prev_day) \
                VALUES(" + "4242" + ", \'" + marketsDelta.MarketName + "\', \'" + marketsDelta.Bid * multiplier + "\',\
                \'" + marketsDelta.Ask * multiplier + "\', \'" + marketsDelta.Last * multiplier + "\', \'" + marketsDelta.High * multiplier + "\',\
                \'" + marketsDelta.Low * multiplier + "\', \'" + marketsDelta.Volume + "\', \'" + marketsDelta.BaseVolume + "\',\
                \'" + marketsDelta.OpenBuyOrders + "\', \'" + marketsDelta.OpenSellOrders + "\', \'" + marketsDelta.PrevDay * multiplier + "\')";
              con.query(sql, function (err, result) {
                if (err) throw err;
                //console.log("Result: " + result);
              });
            });
          });
        }
      });
    },
  },
});

console.log('Connecting ....');
bittrex.websockets.client(function(client) {
  // connected - you can do any one-off connection events here
  //
  // Note: Reoccuring events like listen() and subscribe() should be done
  // in onConnect so that they are fired during a reconnection event.
  console.log('Connected');
});
