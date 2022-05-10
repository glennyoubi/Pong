
export default class IOController {

  #io;
  #clients;
  #clientsArray;
  #maxClients;
  #numbersOfClients;
  #numbersOfPlayers;


  constructor(io) {
    this.#io = io;
    this.#clients = new Map();
    this.#clientsArray = new Array();
    this.#numbersOfClients = 0;
    this.#maxClients = 2;
    this.#numbersOfPlayers = 0;
  }

  registerSocket(socket) {
    console.log(`new connection with id ${socket.id}`);
    if(this.#clientsArray.length == this.#maxClients){
      this.leaveForTooMuch(socket);
    }
    if(this.#clientsArray.length  == 0){
      this.#numbersOfClients  += 1;
      this.#clients.set(socket);
      this.#clientsArray.push(socket.id);
      socket.emit('hello first');
    }
    else if(this.#clientsArray.length  == 1){
      this.#numbersOfClients += 1;
      this.#clients.set(socket);
      this.#clientsArray.push(socket.id);
      socket.emit('hello second');
      this.#io.emit('Start the game');
    }
    console.log(`Numbers clients ${this.#clients.size}`);
    console.log(`CLIENTS ARRAY ${this.#clientsArray.length}`);
    console.log(`Index ${this.#clientsArray.indexOf(socket.id)}`);
    // this.connectToServer(socket);
    this.setupListeners(socket);
  }


  setupListeners(socket) {

    // Gestion de la mise en place des raquettes et du lancement du jeu côté client.
    socket.on('number of clients', () => socket.emit('Currents numbersOfClients', this.#clients.size));

    socket.on( 'disconnect' , () => this.leave(socket) );

    // Gestion des mouvements des raquettes
    socket.on('Paddle move', (ordonnee) => this.moveOppositePaddle(socket, ordonnee));

    // Gestion du déplacement de la balle
    socket.on('Ball move', (abscisse, ordonnee, sx, sy) => this.moveGameBall(socket, abscisse, ordonnee, sx, sy));
  }

  moveOppositePaddle(socket, ordonnee) {
    let socketIndex = this.#clientsArray.indexOf(socket.id);
    console.log(`INDEX DE LA SOCKET EMETRICE ${socketIndex}`);

    if(socketIndex == 0){
      this.#io.to(this.#clientsArray[1]).emit('moveOppositePaddle',ordonnee);
    }
    else if(socketIndex == 1){
      this.#io.to(this.#clientsArray[0]).emit('moveOppositePaddle',ordonnee);
    }  
  }

  moveGameBall(socket, abscisse, ordonnee, sx, sy) {
    this.#io.to(this.#clientsArray[1]).emit('Move the ball', abscisse, ordonnee, sx, sy);
  }



  leave(socket) {
    socket.emit('leave');
    this.#numbersOfClients -= 1;
    const userName = this.#clients.get(socket.id) || 'unknown' ;
    console.log(`disconnection from ${socket.id} (user : ${userName})`);
    console.log(`Socket unregistred ${socket.id} from the server`);
    this.#clients.delete(socket);
    let indextodelele = this.#clientsArray.indexOf(socket.id);
    this.#clientsArray.splice(indextodelele);
    this.#clients.delete(socket);
    console.log(`${this.#clients.size}`);
    console.log(`ARRAY : ${this.#clientsArray.length}`);
    this.#io.emit('leave'); // Lorsqu'un joueur se déconnecte tous sont déconnectés.
  }

  leaveForTooMuch(socket){
    socket.emit('hello too much');
    socket.emit('BYE BYE');
    socket.disconnect(true);
    const userName = this.#clients.get(socket.id) || 'unknown' ;
    console.log(`disconnection from ${socket.id} (user : ${userName})`);
    console.log(`Socket unregistred ${socket.id} from the server`);
    let indextodelele = this.#clientsArray.indexOf(socket.id);
    this.#clientsArray.splice(indextodelele);
    this.#clients.delete(socket);
    console.log(`${this.#clients.size}`);
    console.log(`ARRAY : ${this.#clientsArray.length}`);
  }
}