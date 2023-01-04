// Chat = React.createClass
//     displayName: "Foo"

//     getInitialState: ->
//         messages: []

//     connectionsToPeerIds: (connections) ->
//         _.map connections, (connection) => connection.peer

//     componentWillMount: ->
//         who = getSegments()[1]
//         peer = new Peer who, key: PEER_KEY, debug: 2
//         @connections = []

//         peer.on "error", (error) =>
//             alert error.type

//         peer.on "open", (peerId) =>
//             if who == "x"
//                 peer.on "connection", (connection) =>
//                     @connections.push connection

//                     @listenForMessage connection

//                     peerIds = @connectionsToPeerIds @connections

//                     connection.on "open", =>
//                         connectionsWithoutNewConnection = _.filter @connections, (c) -> c.peer != connection.peer
//                         peerIdsWithoutNewConnection = @connectionsToPeerIds connectionsWithoutNewConnection

//                         if peerIdsWithoutNewConnection.length
//                             connection.send type: "newConnection", peerIds: peerIdsWithoutNewConnection

//             if who != "x"
//                 connection = peer.connect "x"

//                 connection.on "error", (error) =>
//                     alert error

//                 connection.on "open", =>
//                     @connections.push connection

//                     @listenForMessage connection

//                     connection.on "data", (data) =>
//                         if data.type == "newConnection"
//                             peerIds = data.peerIds
//                             _.forEach peerIds, (peerId) =>
//                                 connection = peer.connect peerId

//                                 do (connection) =>
//                                     connection.on "error", (error) =>
//                                         alert error.type

//                                     connection.on "open", =>
//                                         @connections.push connection
//                                         @listenForMessage connection

//                 peer.on "connection", (connection) =>
//                     connection.on "open", =>
//                         @connections.push connection

//                         @listenForMessage connection