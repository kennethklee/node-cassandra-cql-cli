var argv = require('optimist').argv;
var prompt = require('prompt');
var Cassandra = require('cassandra-driver');

argv.host = argv.host || 'localhost';
argv.port = parseInt(argv.port || '9042');

var client = new Cassandra.Client({
  contactPoints: [argv.host],
  protocolOptions: {
    port: argv.port
  }
});


prompt.message = '';
prompt.delimiter = '';

function doPrompt() {
  prompt.get(['cql'], function(err, result) {
    if (result.cql.trim().toLowerCase() === 'exit') {
      return process.exit(1);
    }

    client.execute(result.cql, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(data, null, 2));
      }


      doPrompt();
    });
  });
}


doPrompt();
