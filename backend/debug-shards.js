const dns = require('dns');

const shards = [
    'cluster0-shard-00-00.ioefgnk.mongodb.net',
    'cluster0-shard-00-01.ioefgnk.mongodb.net',
    'cluster0-shard-00-02.ioefgnk.mongodb.net'
];

console.log('Checking A records for potential shards...');

shards.forEach(shard => {
    dns.resolve4(shard, (err, addresses) => {
        if (err) {
            console.log(`Failed to resolve ${shard}: ${err.code}`);
        } else {
            console.log(`Resolved ${shard}: ${addresses}`);
        }
    });
});
