import React, {useState,useEffect} from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";

function StartPage(){
    return(
        <Container>
            <Logo src={logo} alt="로고"></Logo>
            <Catchphrase>나의 첫 번째 로컬 친구, 토모랑</Catchphrase>
            <LoginButton>로그인</LoginButton>
            <SignupButton>회원가입</SignupButton>
        </Container>
    )
}
export default StartPage;

const Container = styled.div`
    background-color:#C5F598;
    width:390px;
    height:844px;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Catchphrase = styled.p`
    color:#4E4E4E;
`
const Logo = styled.img`
    width:143px;
    height:97px;
    margin-top:335px;
    margin-bottom:12px;
`
const LoginButton = styled.button`
    margin-top:225px;
    width: 348px;
    height: 56px;
    border-radius: 12px;
    background: #111;
    color:#fff
`
const SignupButton = styled.button`
    width: 348px;
    height: 56px;
    border-radius: 12px;
    background: #C5F598;
    margin-top:10px;
`