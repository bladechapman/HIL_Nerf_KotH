# HIL_Nerf_KotH

##Description
A web-app version of King of the Hill for large scale nerf games. This encompasses a web-client and server-side game controls. All clients are synced, and clients are individually authorized to prevent cheating. Originally developed for HackIllinois 2015's nerf event.

##Installation
Use your preferred OS' package manager to ensure [Node.js] and [npm] are installed. King of the Hill requires [Express.js] and [Socket.io]. To get these packages, `cd` into the directory containing `package.json` and install:
```
npm install
```
##Usage
To start a new game, run `main.js` on a server with an exposed IP (an exposed IP can be attained via [DigitalOcean]). This will start the web-app's server, listening for clients on port `3000` of your server.
```
node main.js
listening on port *:3000
```

Individual clients must be authorized such that they become interactive. This is to prevent teams from cheating by creating multiple scoreable "hills" anywhere. When a client first logs in, the server will be prompted with an authorization request:
```
authorize request for client n
```
Typing 'yes n' will authorize this client and remove it from the authorization queue. Typing no will deny authorization and also remove that client from the authorization queue. Clients are initialized in an unauthorized state.
```
authorize request for client 0
authorize request for client 1
yes 0
client 0 authorized
no 1
client 1 denied
```

An admin has some additional controls through the server's command prompt:
#####Pause Game
```
stop_all
```
#####Resume Game
```
start_all
```

[DigitalOcean]: http://digitalocean.com
[Node.js]: http://nodejs.org/
[npm]: https://www.npmjs.com/
[Express.js]: http://expressjs.com/
[Socket.io]: http://socket.io/
