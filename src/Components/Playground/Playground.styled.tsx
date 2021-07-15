import styled from 'styled-components';

export const Box = styled.div`   
    position: absolute;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    width: 50%;
    margin: 0;
    padding: 0;
    left: 50%;
    top: 0px;
    border-left: 8px dashed double;
`;

export const Frame = styled.iframe`
    flex-grow: 1;   
    width: 100%;
`;

export const Navigation = styled.div`
    display: flex;
    flex-grow: 0;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 32px;
    padding: 8px 16px;
`;

export const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 32px;
    min-height: 32px;
    font-size: 24px;    
    font-weight: bold;
    flex-grow: 0;
    color: #5d5d5d;
    transition: all .2s;

    &:hover{
        color: #000;
    }
`;

export const Input = styled.input`
    flex-grow: 1;
    height: 32px;
    font-size: 24px;
    margin: 0 16px;
    outline: none;
`;
