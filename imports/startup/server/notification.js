import { Push } from 'meteor/raix:push'
Push.debug = true;
Push.Configure({
  //apn: {
   // certData: Assets.getText('apnDevCert.pem'),
   // keyData: Assets.getText('apnDevKey.pem'),
   // passphrase: 'xxxxxxxxx',
   // production: true,
    //gateway: 'gateway.push.apple.com',
  //},
  gcm: {
    apiKey: 'AIzaSyDwTftBoQ-vWFN7oFf4S7mSJct79YHZIzc',  // GCM/FCM server key
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});

Push.allow({
  send: (userId, notification) => {
    // allow all users to send notifications
    return true;
  }
});

Push.addListener('token', function(currentToken, newToken) {
	// Token is { apn: 'xxxx' } or { gcm: 'xxxx' } or null
	// if newToken is null then the currentToken is invalid
	// if newToken is set then this should replace the currentToken
	
	console.log(currentToken);
	console.log(newToken);
});