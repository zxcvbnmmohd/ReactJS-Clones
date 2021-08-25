import { Avatar, IconButton } from '@material-ui/core'
import AdjustIcon from '@material-ui/icons/Adjust';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components'
function Sidebar() {
    return (
        <Container>
            <Header>
                <Selfie />

                <Buttons>
                    <Button>
                        <AdjustIcon />
                    </Button>

                    <Button>
                        <ChatIcon />
                    </Button>

                    <Button>
                        <MoreVertIcon />
                    </Button>
                </Buttons>
            </Header>

            <SearchBar>
                <SearchContent>
                    <SearchIcon />
                    <SearchInput placeholder="Search or start new chat" />
                </SearchContent>
            </SearchBar>

            <ChatList>
                <ChatItem>
                    <Selfie />
                    <ChatItemTexts>
                        <h4>Mohamed Mohamed</h4>
                        <h5>Hello World!</h5>
                    </ChatItemTexts>
                    <ChatItemInfo>
                        <h6>Monday</h6>
                    </ChatItemInfo>
                </ChatItem>
                <ChatItem>
                    <Selfie />
                    <ChatItemTexts>
                        <h4>Mohamed Mohamed</h4>
                        <h5>Hello World!</h5>
                    </ChatItemTexts>
                    <ChatItemInfo>
                        <h6>Monday</h6>
                    </ChatItemInfo>
                </ChatItem>
            </ChatList>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    width: 30%;
    background-color: #2A2F32;
`

const Header = styled.div`
    padding: 15px;
    position: sticky;
    display: flex;
    flex-direction: row;
    place-content: space-between;
    align-items: center;
    height: 80px;
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
    background-color: #131B21;
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
    
    h5 {
        color: #A8AAAD;
    }
`

const ChatItemInfo = styled.div`
    color: #A8AAAD;
`