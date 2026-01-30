const dns = require('dns');

console.log('Attempting to resolve SRV record for _mongodb._tcp.cluster0.ioefgnk.mongodb.net');

dns.resolveSrv('_mongodb._tcp.cluster0.ioefgnk.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('DNS Resolution Error:', err);
    } else {
        console.log('SRV Records found:', addresses);
    }
});
