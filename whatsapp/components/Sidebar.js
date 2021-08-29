import { Avatar, IconButton } from '@material-ui/core'
import AdjustIcon from '@material-ui/icons/Adjust'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, fieldValues, chatsCollection, writeChat } from '../backend'

function Sidebar(props) {
    const [user] = useAuthState(auth);
    const chatsCollectionRef = chatsCollection().where('membersIDs', 'array-contains', user.phoneNumber)
    const [chatsSnapshot] = useCollection(chatsCollectionRef)

    const createChat = () => {
        const input = prompt("Enter phone number you want to chat with: ")

        if (!input) return null

        if (!doesChatExists(input)) {
            const now = fieldValues.serverTimestamp()
            const membersIDs = [input, auth.currentUser.phoneNumber]
            const membersArray = membersIDs.map(id => {
                return {
                    userID: id,
                    count: 0,
                    didRead: false,
                    when: now,
                }
            })
            const members = {}

            membersArray.forEach(m => {
                members[m.userID] = {
                    count: m.count,
                    didRead: m.didRead,
                    when: m.when,
                }
            })

            const id = chatsCollection().doc().id
            const c = {
                members: members,
                membersIDs: membersIDs,
                recentMessage: {
                    owner: auth.currentUser.uid,
                    type: 'text',
                    msg: 'Hi!',
                    membersIDs: membersIDs,
                    createdAt: now,
                },
                createdAt: now,
                updatedAt: now,
            }

            writeChat(id, c, true,)

            // props.setCurrentChat(c)
        }
    }

    const doesChatExists = (input) => !!chatsSnapshot?.docs.find(chat => chat.data().membersIDs.find(number => number === input)?.length > 0)

    return (
        <Container>
            <Header>
                <Selfie />

                <Buttons>
                    <Button>
                        <AdjustIcon />
                    </Button>

                    <Button onClick={() => createChat()}>
                        <ChatIcon />
                    </Button>

                    <Button onClick={() => auth.signOut()}>
                        <MoreVertIcon />
                    </Button>
                </Buttons>
            </Header>

            <SearchBar>
                <SearchContent>
                    <SearchIcon />
                    <SearchInput placeholder="Search chats" />
                </SearchContent>
            </SearchBar>

            <ChatList>
                {
                    chatsSnapshot?.docs.map(chat => {
                        const otherNumber = chat.data().membersIDs[chat.data().membersIDs.findIndex(m => m !== auth.currentUser.phoneNumber)]

                        return <ChatItem
                            key={chat.id}
                            id={chat.id}
                            isCurrentChat={props.currentChat === null ? false : props.currentChat.chatID == chat.id}
                            onClick={
                                () => {
                                    const c = {
                                        chatID: chat.id,
                                        members: chat.data().members,
                                        membersIDs: chat.data().membersIDs,
                                        recentMessage: {
                                            owner: chat.data().recentMessage.owner,
                                            type: chat.data().recentMessage.type,
                                            msg: chat.data().recentMessage.msg,
                                            membersIDs: chat.data().recentMessage.membersIDs,
                                            createdAt: chat.data().recentMessage.createdAt,
                                        },
                                        createdAt: chat.data().createdAt,
                                        updatedAt: chat.data().updatedAt,
                                    }

                                    console.log(c)

                                    props.setCurrentChat(c)
                                }
                            }>
                            <Selfie />
                            <ChatItemTexts>
                                <h4>{otherNumber}</h4>
                                <h5>{chat.data().recentMessage.msg}</h5>
                            </ChatItemTexts>
                            <ChatItemInfo>
                                <h6>Monday</h6>
                            </ChatItemInfo>
                        </ChatItem>
                    })
                }
            </ChatList>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    width: 30%;
    background-color: #2A2F32;
    border-right: 1px solid #242D32;
`

const Header = styled.div`
    padding: 15px;
    position: sticky;
    display: flex;
    flex-direction: row;
    place-content: space-between;
    align-items: center;
    height: 60px;
`

const Selfie = styled(Avatar)`
    cursor: pointer;
    
    :hover {
        opacity: 0.8;
    }
`

const Buttons = styled.div`
    
`

const Button = styled(IconButton)`
    &&& {
        color: #B1B3B5;
    }
`

const SearchBar = styled.div`
    background-color: #131B21;
    position: sticky;
    height: 60px;
    padding: 10px 15px 10px 15px;
    border-bottom: 1px solid #242D32;
    &&& {
        color: #7E8285;
    }
`

const SearchContent = styled.div`
    background-color: #323739;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 30px;
`

const SearchInput = styled.input`
    margin-left: 10px;
    background: transparent;
    outline-width: 0;
    border: none;
    font-size: 20px;
    flex: 1;
    color: #D4D5D7;
`

const ChatList = styled.div`
`

const ChatItem = styled.div`
    cursor: pointer;
    background-color: #131B21;
    opacity: ${props => props.isCurrentChat ? 0.75 : 1.0};
    display: flex;
    height: 75px;
    align-items: center;
    padding: 25px;
    border-bottom: 1px solid #242D32;
`

const ChatItemTexts = styled.div`
    flex: 1;
    margin-left: 15px;
    margin-right: 15px;
    color: #E1E2E3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    h5 {
        color: #A8AAAD;
    }
`

const ChatItemInfo = styled.div`
    color: #A8AAAD;
`