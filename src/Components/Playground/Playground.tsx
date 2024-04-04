import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Box, Frame, Navigation, Input, Button } from './Playground.styled';

const baseUrl = '/playground.html';

export const Playground = () => {

    const [url, setUrl] = useState('');
    const ref = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        window.onmessage = ({ data }) => {
            try {
                data = JSON.parse(data);
                setUrl(data.pathname.replace(baseUrl, '') + data.hash)
            }
            catch { }
        }
    }, []);

    const updateUrl = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
    const reload = () => ref.current?.contentWindow?.location.reload();
    const replace = () => ref.current?.contentWindow?.location.replace(baseUrl + url);
    const goToUrl = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && replace();

    return (
        <Box>
            <Navigation>
                <Button onClick={reload}>&#11118;</Button>
                <Input type="text" value={url} onChange={updateUrl} onKeyDown={goToUrl} />
                <Button onClick={replace}>&#10150;</Button>
            </Navigation>
            <Frame ref={ref} src={baseUrl} sandbox="allow-same-origin allow-scripts" />
        </Box>
    );
}