import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Peer } from "peerjs";

import Page from "../../../Components/Page";
import CustomizedInputs from "../../../Components/TextBox";
import Button from "../../../Components/Button";
import AppModalPopUp from "../../../Components/AppModalPopUp";
import { Grid, TextField, SpeedDial, SpeedDialAction } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import IosShareIcon from '@mui/icons-material/IosShare';
import DuoIcon from '@mui/icons-material/Duo';

var myId = 0;
var render = 0;
export default function Chat() {
    var CryptoJS = require("crypto-js");
    let mySecretKey = "HIiam@@@@RRRRRRMMMMMMMM#######";
    let styles = { width: "fit-content", padding: "4px", borderRadius: 5, margin: 0, margin: "8px 8px" };
    let sendDiv = { width: "98%", position: "absolute", bottom: "0", left: "0", height: "40px", display: "flex", border: "1px solid #ccc", padding: "5px", margin: "5px" };

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
            console.log(conn.peer, "connected");
            myId = conn.peer;
            conn.on('data', function (data) {
                console.log(conn.peer, "recieved");
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
            console.log(call, "call recieves");
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
                // call.on("close", () => {
                //     setOpenCallSection(false);
                // });
            }, err => { console.error('Error!', err) });
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
            setOpenCallSection(true);
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                // window.call = peerInstance.current.call(friendId, mediaStream);
                const call = peerInstance.current.call(friendId, mediaStream);
                console.log("call opened", call);
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                    console.log("call streaming ", friendId);
                });
                // call.on("close", () => {
                //     setOpenCallSection(false);
                // });
            }, err => { console.error('Error!', err) });
        }
    }

    const endCall = () => {
        // window.call.on("close", () => { setOpenCallSection(false); });
    }

    // shareScreen option
    async function shareScreen() {
        let options = {
            video: { displaySurface: "window" },
            audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100, suppressLocalAudioPlayback: true },
            surfaceSwitching: "include", selfBrowserSurface: "exclude", systemAudio: "exclude"
        }
        if (friendId) {
            setOpenScreenShareSection(true);
            try {
                let captureStream = await navigator.mediaDevices.getDisplayMedia(options);
                // *********************
                // screenShareRef.current.srcObject = captureStream;
                // screenShareRef.current.play();
                // _________________
                const call = peerInstance.current.call(friendId, captureStream);
                console.log(call, "calling");
                call.on('stream', (remoteStream) => {
                    screenShareRef.current.srcObject = remoteStream;
                    screenShareRef.current.play();
                    console.log("sharing ", friendId);
                });
                // _________________
                captureStream.getVideoTracks()[0].addEventListener('ended', () => {
                    console.log("ended");
                    setOpenScreenShareSection(false);
                });
            } catch (err) {
                console.error(`Error: ${err}`);
                setOpenScreenShareSection(false);
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
                <p key={i} style={item.sender === "sender" ? { background: '#ccc', ...styles } : { background: '#e2d5c5', ...styles }}>
                    {item.message}
                </p>
            ));
        }
    }, [number, render]);

    const actionsSend = [
        { icon: <DuoIcon />, name: 'Vedio Call', function: () => call },
        { icon: <IosShareIcon />, name: 'Share Screen', function: () => shareScreen() },
    ];

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
                {/* ADD FRIENDS IN LIST */}

                <Grid container sx={{ marginTop: "1rem" }}>
                    <Grid item md={4} xs={12} s>
                        {/* CHAT LISTS */}
                        <div style={{ background: "#fff", boxShadow: "1px 1px 1px 0px #ccc", width: "98%", minHeight: "80vh" }} >
                            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", }}>
                                <tbody>
                                    <tr style={{ height: "50px", background: "rgb(244 245 246)", color: "black", }}>
                                        <th style={{ padding: "5px" }} colSpan={2}>Users</th>
                                    </tr>
                                    {users.length === 0 && <tr style={{ textAlign: "left", height: "40px" }}><td style={{ padding: "5px" }} colSpan={3}>No Friends</td></tr>}
                                    {users?.length > 0 && users.map((item, i) => (
                                        <tr key={i} style={{ height: "40px", }}>
                                            <td style={{ padding: "5px", width: "70%" }}  >{item}</td>
                                            <td style={{ padding: "5px", textAlign: "right" }}><Button onClick={() => ConnectWithFriend(item)} label="Connect" /></td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                        {/* CHAT LISTS */}
                    </Grid>
                    {/* YOUR CHATS */}
                    <Grid item md={8} xs={12} >
                        <div style={{ background: "#fff", boxShadow: "1px 1px 1px 0px #ccc", minHeight: "80vh", position: "relative" }} >
                            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", marginBottom: "8px" }}>
                                <tbody>
                                    <tr style={{ height: "50px", textAlign: "left", background: "rgb(244 245 246)", color: "black" }}>
                                        <td style={{ padding: "5px" }} colSpan={2}><b>Chat with : {friendId ? friendId : "----------"}</b></td>
                                    </tr>
                                    {!friendId && <tr style={{ height: "40px" }}><td style={{ textAlign: "left", padding: "5px" }}>Empty</td></tr>}
                                </tbody>
                            </table>
                            {renderMyChats()}
                            {friendId && <div style={sendDiv}>
                                <TextField sx={{ width: "90%" }} InputProps={{ disableUnderline: true }} placeholder="Enter Message" variant='standard'
                                    multiline onChange={handleChange} value={message} />
                                <SendIcon sx={{ fontSize: "18px", color: "#6d6868", margin: "5px" }} onClick={send} />
                                <SpeedDial ariaLabel="SpeedDial basic example"
                                    sx={{ position: 'relative', '& .MuiFab-primary': { backgroundColor: '#ccc', color: 'white', width: 40, height: 50, margin: -0.3, } }} direction={"up"}
                                    icon={<SpeedDialIcon />}
                                >
                                    {actionsSend.map((action) => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                            onClick={action.function}
                                        />
                                    ))}
                                </SpeedDial>
                            </div>}
                            {/* video chat */}
                            {isCallSection && <div style={{ height: "50vh", width: "80%", background: "#fff", marginBottom: "8px" }}>
                                <video ref={currentUserVideoRef} />
                                <video ref={remoteVideoRef} />
                                <Button onClick={endCall} label="End" />
                            </div>}
                            {/* screen sharing */}
                            {isScreenShareSection && <div style={{ height: "100vh", width: "80%", background: "#fff", marginBottom: "8px" }}>
                                <video style={{ height: "100%", width: "100%" }} controls={true} muted={true} ref={screenShareRef} />
                            </div>}
                        </div>
                    </Grid>
                    {/* YOUR CHATS */}
                </Grid>


            </Page>
        </div>
    )
}
