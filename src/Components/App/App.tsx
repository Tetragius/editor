
import React from 'react';
import { Body } from 'vienna-ui';
import { Playground, Redactor } from '..';
import { GlobalStyle } from './App.styled';

export const App = () => {
    return (
        <Body>
            <GlobalStyle />
            <Redactor />
            <Playground />
        </Body>
    )
}
