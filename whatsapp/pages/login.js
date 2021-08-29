import React, { useEffect, useState } from 'react'
import Head from "next/head"
import styled from "styled-components"
import { firebase, auth, createCurrentUserDocument, readCurrentUserDocument } from '.././backend'

const recaptchaVerifier = (container, params) => {
    return new firebase.auth.RecaptchaVerifier(container, params);
};

export default function Login() {
    const [isMounted, setIsMounted] = useState(true)
    const [countryCode, setCountryCode] = useState('+1')
    const [phoneNumber, setPhoneNumber] = useState('4161111111')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        return () => { setIsMounted(false) }
    }, [])

    const setupreCAPTCHA = () => {
        window.recaptchaVerifier = recaptchaVerifier(
            'recaptcha-container',
            {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log(response);
                    onSignInSubmit();
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    console.log('reCAPTCHA Expired....')
                    if (isMounted) setIsLoading(false)
                }
            }, auth);
    }

    const onSignInSubmit = (event) => {
        event.preventDefault()

        if (isLoading) return null;
        if (isMounted) setIsLoading(true)

        setupreCAPTCHA()

        const appVerifier = window.recaptchaVerifier
        const number = countryCode + phoneNumber

        console.log(number)

        auth.signInWithPhoneNumber(number, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                console.log(confirmationResult)

                confirmationResult.confirm(getCodeFromUserInput()).then(async (result) => {
                    // User signed in successfully.
                    const user = result.user
                    console.log(user)
                    console.log(user.phoneNumber)
                    const doc = readCurrentUserDocument();

                    if (!(await doc).exists) {
                        console.log('New User!!!')
                        const name = getFullNameFromUserInput()

                        createCurrentUserDocument({
                            phoneNumber: number,
                            name: name,
                        })
                        alert("Account Created!")
                    } else {
                        alert("Welcome Back!")
                    }

                    if (isMounted) setIsLoading(false)
                }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    console.log(error)

                    window.recaptchaVerifier.render().then((widgetID) =>
                        grecaptcha.reset(widgetID)
                    )

                    if (isMounted) setIsLoading(false)
                    alert('Sorry that was a wrong code ...')
                })
            }).catch((error) => {
                // Error; SMS not sent
                console.log(error)
                if (isMounted) setIsLoading(false)
                alert('Something went wrong, try agian ...')
            });
    }

    const getCodeFromUserInput = () => {
        return prompt('Enter OTP')
    }

    const getFullNameFromUserInput = () => {
        return prompt('What\'s your full name?')
    }

    return (
        <div>
            <Head>
                <title>WhatsApp | Login</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <Content>
                    <Left></Left>
                    <Right>
                        <h1>Login with your phone nummber</h1>
                        <LoginForm onSubmit={onSignInSubmit}>
                            <CountryCodeInput placeholder="Country Code" value={countryCode} onChange={(s) => setCountryCode(s.target.value)} />
                            <PhoneNumberInput placeholder="Phone Number" value={phoneNumber} onChange={(s) => setPhoneNumber(s.target.value)} />
                        </LoginForm>
                        <LoginButton onClick={onSignInSubmit}>
                            {isLoading ? <p>Authenticating....</p> : <p>Send Code</p>}
                        </LoginButton>
                        <div id="recaptcha-container"></div>
                    </Right>
                </Content>
            </Container>
        </div>
    );
}

const Container = styled.div`
	margin: 0 auto;
	width: 1400px;
	display: grid;
	height: 100vh;
	align-items: center;
`;

const Content = styled.div`
	background-color: #262d31;
	box-shadow: 0px 0px 10px 1px #0b0e11;
	height: 750px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	background-image: url("/patterns.jpg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
`;

const Left = styled.div`
	flex: 1;
	background-image: url("/logo-light.png");
	background-repeat: no-repeat;
	background-size: 50%;
	background-position: center;
`

const Right = styled.div`
	background-color: white;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	padding: 50px;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: row;
    height: 80x;
`

const CountryCodeInput = styled.input`
    background: #F7F6F9;
    outline-width: 0;
    border: 1px #A9A9A9 solid;
    font-size: 25px;
    width: 225px;
    color: #000000;
    padding: 25px;
    margin-top: 25px;
    margin-bottom: 20px;
    text-align: right;
`

const PhoneNumberInput = styled.input`
    flex: 1;
    background: #F7F6F9;
    outline-width: 0;
    border: 1px #A9A9A9 solid;
    font-size: 25px;
    color: #000000;
    padding: 25px;
    margin-top: 25px;
    margin-bottom: 20px;
`

const LoginButton = styled.div`
    cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
    height: 80px;
    font-size: 25px;
    background-color: #1BBFA5;
    color: #FAFAFA;
    
`
