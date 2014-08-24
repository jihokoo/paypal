var _ = require("underscore");

var store = (function() {
  var data = []; // private variable closed over

  var validate = function(input) {
    var type = input.type, 
      subject = input.subject, 
      date = input.date, 
      amount = parseFloat(input.amount);

    if(!(type && subject && date && amount) && (amount === undefined)){
      return {message: 'Error: Missing data fields.'};
    } else if(new Date(date).toString() === 'Invalid Date'){
      return {message: 'Error: Invalid Date.'};
    } else if(['Purchase', 'Transfer', 'Refund'].indexOf(type) === -1){
      return {message: 'Error: Invalid Transaction Type.'};
    } else if((!!amount === false) || (amount !== 0) && (typeof amount !== 'number')){
      return {message: 'Error: Invalid Amount.'};
    } else{
      return true;
    }
  };

  return {
    push: function(input) {
      var isValidated = validate(input);
      if(isValidated !== true) return isValidated;

      data.push({
        "type": input.type,
        "subject": input.subject,
        "date": input.date,
        "amount": input.amount
      });
      return input;
    },
    list: function() {
      return data;
    },
    find: function(properties) {
      return _.where(data, properties);
    },
    clear: function() {
      var toBeDeleted = data;
      data = [];
      delete toBeDeleted;
      return data;
    }
  };
})();

var transactions = [{type: 'Purchase', subject: 'Hello', date: new Date(), amount: 5000}, 
{type: 'Purchase', subject: 'Hello', date: new Date(), amount: 1000}, 
{type: 'Transfer', subject: 'Yo', date: new Date(), amount: 200},
{type: 'Refund', subject: 'What up', date: new Date(), amount: 8000},
{type: 'Purchase', subject: 'Good-bye', date: new Date(), amount: 3.33}];

transactions.forEach(function(transaction){
  store.push(transaction);
});

module.exports = store;

