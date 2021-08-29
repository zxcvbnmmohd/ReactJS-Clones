import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import AdjustIcon from '@material-ui/icons/Adjust'
import VoiceChatIcon from '@material-ui/icons/VoiceChat'
import PhoneIcon from '@material-ui/icons/Phone'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MicNoneIcon from '@material-ui/icons/MicNone'
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Message } from '../components'
import { auth, fieldValues, chatDocument, writeChat } from '../backend'

function Chat(props) {
    const msgsCollectionRef = chatDocument(props.currentChat.chatID).collection('messages').orderBy('createdAt', 'asc')
    const [msgsSnapshot] = useCollection(msgsCollectionRef)

    const [msg, setMsg] = useState('')

    const handleSendMessage = (event) => {
        event.preventDefault()

        if (msg === '') return null

        const now = fieldValues.serverTimestamp()

        writeChat(
            props.currentChat.chatID,
            {
                members: props.currentChat.members,
                membersIDs: props.currentChat.membersIDs,
                recentMessage: {
                    owner: auth.currentUser.uid,
                    type: 'text',
                    msg: msg,
                    membersIDs: props.currentChat.membersIDs,
                    createdAt: now,
                },
                createdAt: props.currentChat.createdAt,
                updatedAt: now,
            },
            false,
        )

        setMsg('')
    }

    return (
        <Container>
            <Header>
                <Selfie />
                <UserInfo>
                    <h4>Mohamed Mohamed</h4>
                    <h5>last seen today at 5:00 pm</h5>
                </UserInfo>
                <ChatActions>
                    <Button>
                        <VoiceChatIcon />
                    </Button>
                    <Button>
                        <PhoneIcon />
                    </Button>
                    <p>|</p>
                    <Button>
                        <SearchIcon />
                    </Button>
                    <Button>
                        <ExpandMoreIcon />
                    </Button>
                </ChatActions>
            </Header>
            <MessagesList>
                {
                    msgsSnapshot?.docs.map(m => {
                        const message = {
                            owner: m.data().owner,
                            type: m.data().type,
                            msg: m.data().msg,
                            membersIDs: m.data().membersIDs,
                            createdAt: m.data().createdAt,
                        }

                        return <Message message={message} />
                    })
                }

            </MessagesList>
            <Footer>
                <Button>
                    <EmojiEmotionsIcon />
                </Button>
                <Button>
                    <AttachFileIcon />
                </Button>
                <MessageBar>
                    <MessageForm onSubmit={handleSendMessage}>
                        <TextField
                            placeholder='Type a message...'
                            value={msg}
                            onChange={(s) => setMsg(s.target.value)}
                        />
                    </MessageForm>
                </MessageBar>
                <Button onClick={handleSendMessage}>
                    {
                        msg === '' ? <MicNoneIcon /> : <SendIcon />
                    }
                </Button>
            </Footer>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    background-color: #131B21;
    opacity: 0.75;
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Header = styled.div`
    padding: 15px;
    position: sticky;
    display: flex;
    flex-direction: row;
    place-content: space-between;
    align-items: center;
    height: 60px;
    background: #2A2F32;
`

const Selfie = styled(Avatar)`
    cursor: pointer;
    
    :hover {
        opacity: 0.8;
    }
`


const UserInfo = styled.div`
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;
    color: #E1E2E3;
    
    h5 {
        color: #A8AAAD;
    }
`

const ChatActions = styled.div`
    color: #A8AAAD;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30px;
    color: #B1B3B5;
    
    p {
        padding-left: 10px;
    }
`

const Button = styled(IconButton)`
    &&& {
        margin-left: 10px;
        color: #B1B3B5;
    }
`

const MessagesList = styled.div`
    background-color: #131B21;
    flex: 1;
    display: flex;
    flex-direction: column;
    /* align-items: flex-str; */
`

const Footer = styled.div`
    background-color: #1E2429;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const MessageBar = styled.div`
    flex: 1;
    background-color: #34383C;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 70%;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 30px;
    
    form {
    flex: 1;
    }
`

const MessageForm = styled.form`
    display: flex;
    flex-direction: row;
    flex: 1
`

const TextField = styled.input`
    background: transparent;
    outline-width: 0;
    border: none;
    font-size: 15px;
    flex: 1;
    color: white;
`