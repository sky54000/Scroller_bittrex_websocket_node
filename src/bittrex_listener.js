var mysql = require('mysql');
var dict = require("dict");
var cron = require('node-cron');
const bittrex = require('./node.bittrex.api');

Array.prototype.contains = function(elem) {
  for (var i in this) {
    if (this[i] == elem) return true;
    }
    return false;
}

var multiplier = function(nb){ return nb * 100000000;};
yaml = require('js-yaml');
fs   = require('fs');
try {
  var config_markets = yaml.safeLoad(fs.readFileSync('/usr/src/app/config.yml', 'utf8'));
} catch (e) {
  console.log(e);
}
var baseCurrencyList = config_markets["target_base_currency_market"];
var marketList = new Array();
var sharedMarketListObject = new Array();

baseCurrencyList.forEach(function(baseCurrency){
  marketsListTmp = config_markets[baseCurrency];
  marketsListTmp.forEach(function(market){
    marketList.push(market);
  });
});

var con = mysql.createConnection({
  host: "scrollerdb",
  user: "root",
  password: "pass",
  database: "Scroller_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var insertToDB = function(market){
  var sql = "INSERT INTO ticker(id_bot, marketName, bid,ask,last, high, low, \
    volume, base_volume, open_buy_orders, open_sell_orders, moy_prev_day) \
    VALUES(" + "4242" + ", \'" +
    market.MarketName + "\', \'" +
    multiplier(market.Bid) + "\', \'" +
    multiplier(market.Ask) + "\', \'" +
    multiplier(market.Last) + "\', \'" +
    multiplier(market.High) + "\',\'" +
    multiplier(market.Low) + "\', \'" +
    market.Volume + "\', \'" +
    market.BaseVolume + "\', \'" +
    market.OpenBuyOrders + "\', \'" +
    market.OpenSellOrders + "\', \'" +
    multiplier(market.PrevDay) + "\')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
};

// cron is call each 30 seconds to insert the shared object into database.
cron.schedule('0,30 * * * * *', function(){
  sharedMarketListObject.forEach(function(market) {
    insertToDB(market);
  });
  console.log("shared insert");
});

bittrex.options({
  verbose: true,
  websockets: {
    onConnect: function() {
      console.log('Scroller start soon.');
      bittrex.websockets.listen(function(data, client) {
        if (data.M === 'updateSummaryState') {
          data.A.forEach(function(data_for) {
            sharedMarketListObject = new Array();
            data_for.Deltas.forEach(function(marketsDelta) {
              if (marketList.contains(marketsDelta.MarketName) == true) {
                sharedMarketListObject.push(marketsDelta)
              }
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
