import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Peer } from "peerjs";
import Page from "../../../Components/Page";
import CustomizedInputs from "../../../Components/TextBox";
import Button from "../../../Components/Button";
import AppModalPopUp from "../../../Components/AppModalPopUp";


var myId = 0;
var render = 0;
export default function Chat() {
    var CryptoJS = require("crypto-js");
    let mySecretKey = "HIiam@@@@RRRRRRMMMMMMMM#######";
    let styles = { width: "fit-content", padding: "4px", borderRadius: 5, margin: 0 }

    const [isOpenAddmodal, setOpenAddModal] = useState(false);
    const actions = [
        {
            label: "Add Friend",
            action: () => {
                setOpenAddModal(true);
            }
        }
    ];
    const [users, setUsers] = useState([]); //friendlist
    const [remotePeerIdValue, setRemotePeerIdValue] = useState(""); //for adding friends
    const [number, setNumber] = useState(0); //for rerendering
    const [message, setMessage] = useState(""); //setting message
    const [friendId, setFriendId] = useState(""); //setting each user id
    const [messageSetUsers, setMessagesSetUsers] = useState([]); //setting all message of each user
    const [isCallSection, setOpenCallSection] = useState(false); //open call section
    const [isScreenShareSection, setOpenScreenShareSection] = useState(false); //open share screen section


    const remoteVideoRef = useRef(null); //videocalling reciever
    const currentUserVideoRef = useRef(null); //videocalling sender
    const screenShareRef = useRef(null); //screen sharing
    const peerInstance = useRef(null);

    // { host: '192.168.1.78', port: '3000' }
    useEffect(() => {
        // connection initializing
        const peer = new Peer('rijo-md-98');
        peer.on('open', (id) => {
            console.log(id);
        });
        // mesage recieve options
        peer.on('connection', function (conn) {
            myId = conn.peer;
            conn.on('data', function (data) {
                var bytes = CryptoJS.AES.decrypt(data, mySecretKey);
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                if (myId) {
                    let peerId = conn.peer ? conn.peer : myId;
                    let myUser = messageSetUsers.find(item => item.user === peerId);
                    let msg = {
                        message: originalText,
                        sender: "reciever"
                    }
                    myUser?.messages.push(msg);
                    let foundIndex = messageSetUsers.findIndex(x => x.user == peerId);
                    messageSetUsers[foundIndex] = myUser;
                    setMessagesSetUsers(messageSetUsers);
                    render = render + 1;
                    setNumber(number + 1);
                    console.log("data recieved from senter", peerId);
                }
            });
        });
        // call recivieng option
        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                console.log("call answering recieves");
                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                    console.log("call streaming recieves");
                });
            });
        });
        peerInstance.current = peer;
    }, [])

    // connection URL
    const onChange = (e) => {
        setRemotePeerIdValue(e.target.value)
    }
    // messege
    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    // add friends in uy list
    const AddFriend = () => {
        if (remotePeerIdValue) {
            users.push(remotePeerIdValue);
            setUsers(users); //set users
            messageSetUsers.push({
                user: remotePeerIdValue,
                messages: []
            });
            setMessagesSetUsers(messageSetUsers)//setting each users messages
            setOpenAddModal(false);//clearing 
            setRemotePeerIdValue("");
        }
    }
    // connect with friend
    const ConnectWithFriend = (id) => {
        setFriendId(id);
        myId = id;
        setNumber(number + 1);
    }
    // send message
    const send = () => {
        if (friendId) {
            const conn = peerInstance.current.connect(friendId);
            var ciphertext = CryptoJS.AES.encrypt(message, mySecretKey).toString();
            conn.on('open', () => {
                conn.send(ciphertext);
                let myUser = messageSetUsers.find(item => item.user === friendId);
                let data = {
                    message: message,
                    sender: "sender"
                }
                myUser?.messages.push(data);
                let foundIndex = messageSetUsers.findIndex(x => x.user == friendId);
                messageSetUsers[foundIndex] = myUser;
                setMessagesSetUsers(messageSetUsers);
                setNumber(number + 1);
                setMessage("");
                console.log("messages sent successfully", friendId);
                // setTimeout(function () { conn.close(); }, 500);
            });
        }
    }
    // videocall option
    const call = () => {
        if (friendId) {
            setOpenCallSection(true)
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                const call = peerInstance.current.call(friendId, mediaStream)
                console.log("call opened", call);
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                    console.log("call streaming ", friendId);
                });
            }, err => { console.log('Error!') });
        }
    }
    const endCall = () => {
        setOpenCallSection(false);
        // conn.close();
    }

    // shareScreen option
    async function shareScreen() {
        const options = { audio: true, video: true };
        if (friendId) {
            setOpenScreenShareSection(true);
            try {
                let captureStream = await navigator.mediaDevices.getDisplayMedia(options);
                screenShareRef.current.srcObject = captureStream;
                console.log(captureStream, "captureStream");
            } catch (err) {
                console.error(`Error: ${err}`);
            }
        }
    }

    // render my chat
    const renderMyChats = useCallback(() => {
        // console.log("renderMyChats")
        if (friendId) {
            let myUser = messageSetUsers.find(item => item.user === friendId);
            let messages = myUser.messages;
            return messages.map((item, i) => (
                <tr key={i} style={{ height: "35px" }}>
                    <td style={{ padding: "5px" }} colSpan={3} >
                        <p style={item.sender === "sender" ? { background: '#ccc', ...styles } : { background: '#e2d5c5', ...styles }}>
                            {item.message}</p>
                    </td>
                </tr>
            ));
        }
    }, [number, render]);

    return (
        <div>
            <Page
                title="Chat Applications"
                girdSet={{ xs: 12 }}
                actions={actions}
            >

                {/* ADD FRIENDS IN LIST */}
                <AppModalPopUp title="Add Friend In Your List" open={isOpenAddmodal} onClose={() => setOpenAddModal(false)} >
                    <div>
                        <table style={{ width: "80%", borderCollapse: "collapse", background: "#fff", margin: "auto" }}>
                            <tbody>
                                <tr style={{ height: "50px" }}>
                                    <td colSpan={2} style={{ padding: "5px" }}>
                                        <CustomizedInputs placeholder="Enter Connection URL" onChange={onChange} value={remotePeerIdValue} />
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        <Button onClick={AddFriend} label="Add" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </AppModalPopUp>

                {/* YOUR CHATS */}
                {/* ++++++++++++++++++++++++++++++++++++ */}
                <div>
                    <table style={{ width: "80%", borderCollapse: "collapse", background: "#fff", marginBottom: "8px" }}>
                        <tbody>
                            <tr style={{ height: "40px", textAlign: "center" }}>
                                <td colSpan={3}><b>Chat with : {friendId ? friendId : "----------"}</b></td>
                            </tr>
                            {renderMyChats()}

                            {friendId && <tr>
                                <td colSpan={2} style={{ padding: "5px" }}>
                                    <CustomizedInputs placeholder="Enter Message" onChange={handleChange} multiline={true} value={message} />
                                </td>
                                <td style={{ padding: "5px", }}>
                                    <Button onClick={send} label="Send" />
                                    <Button style={{ marginLeft: "8px" }} onClick={call} label="Call" />
                                    <Button style={{ marginLeft: "8px" }} onClick={shareScreen} label="ShareScreen" />
                                </td>
                            </tr>}
                            {!friendId && <tr><td style={{ textAlign: "center" }}>Empty</td></tr>}
                        </tbody>
                    </table>
                    {/* video chat */}
                    {isCallSection && <div style={{ height: "50vh", width: "80%", background: "#fff", marginBottom: "8px" }}>
                        <video ref={currentUserVideoRef} />
                        <video ref={remoteVideoRef} />
                        <Button onClick={endCall} label="End" />
                    </div>}

                    {/* screen sharing */}
                    {isScreenShareSection && <div style={{ height: "50vh", width: "80%", background: "#fff", marginBottom: "8px" }}>
                        <video ref={screenShareRef} />
                    </div>}
                </div>
                {/* ++++++++++++++++++++++++++++++++++++ */}


                {/* CHAT LISTS */}
                <div style={{ marginBottom: "8px" }}>
                    <table style={{ width: "80%", textAlign: "left", borderCollapse: "collapse", background: "#fff", }}>
                        <tbody>
                            <tr style={{ height: "50px", background: "#ccc", color: "#fff", }}>
                                <th style={{ padding: "5px", width: "70%", }} colSpan={2}>Users</th>
                                <th style={{ padding: "5px" }}>Action</th>
                            </tr>
                            {users.length === 0 && <tr style={{ textAlign: "center", height: "40px" }}><td colSpan={3}>No Friends</td></tr>}
                            {users?.length > 0 && users.map((item, i) => (
                                <tr key={i} style={{ height: "40px", }}>
                                    <td style={{ padding: "5px", width: "70%", }} colSpan={2} >{item}</td>
                                    <td style={{ padding: "5px" }}><Button onClick={() => ConnectWithFriend(item)} label="Connect" /></td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>

            </Page>
        </div>
    )
}
