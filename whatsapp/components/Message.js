import styled from 'styled-components'
import { auth } from '../backend'

function Message(props) {
    const toTime = (date) => (new Date(date?.toDate().getTime())).toLocaleTimeString()

    return (
        props.message.owner !== auth.currentUser.uid
            ? <OwnerMessageItem>
                <TopRightTriangle />
                <OwnerMessageContents>
                    <MessageContentsMsg>
                        <p>{props.message.msg}</p>
                    </MessageContentsMsg>
                    <MessageContentsDate>
                        <p>{toTime(props.message.createdAt)}</p>
                    </MessageContentsDate>
                </OwnerMessageContents>
            </OwnerMessageItem>
            : <OtherMessageItem>
                <TopLeftTriangle />
                <OtherMessageContents>
                    <MessageContentsMsg>
                        <p>{props.message.msg}</p>
                    </MessageContentsMsg>
                    <MessageContentsDate>
                        <p>{toTime(props.message.createdAt)}</p>
                    </MessageContentsDate>
                </OtherMessageContents>
            </OtherMessageItem>
    )
}

export default Message

const OwnerMessageItem = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 60%;
    margin: 25px auto 0px 100px;
`

const OwnerMessageContents = styled.div`
    background-color: #262D31;
    display: flex;
    flex-direction: row;
    border-radius: 0px 5px 5px 5px;
`

const OtherMessageItem = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin: 25px 100px 0px auto;
    max-width: 60%;
`

const OtherMessageContents = styled.div`
    background-color: #056262;
    display: flex;
    flex-direction: row;
    border-radius: 5px 0px 5px 5px;
`

const MessageContentsMsg = styled.div`
    color: white;
    padding: 10px;
    flex: 1;
`

const MessageContentsDate = styled.div`
    color: #7A7F82;
    display: flex;
    align-items: flex-end;
    padding: 5px;
    font-size: 12px;
`

const TopRightTriangle = styled.div`
    width: 0;
    height: 0;
    border-top: 12.5px solid #262D31;
    border-left: 12.5px solid transparent;
`

const TopLeftTriangle = styled.div`
    width: 0;
    height: 0;
    border-top: 12.5px solid #056262;
    border-right: 12.5px solid transparent;
`
