import App from 'next/app';
import React from 'react';
import * as Sentry from '@sentry/browser';
import { MapkitProvider } from 'react-mapkit';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Fire from '../lib/db';
import { typeface } from '../constants/type';

import '../css/reset.css';
import '../css/nprogress.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: typeface.sansSerif,
    },
});

Sentry.init({
    dsn: 'https://f627f33f82bf4244a649b11eca44988d@sentry.io/1876851',
});

class HikeAround extends App {
    async componentDidMount() {
        await new Fire();
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <MapkitProvider tokenOrCallback={process.env.mapkitToken}>
                    <Component {...pageProps} />
                </MapkitProvider>
            </ThemeProvider>
        );
    }
}

export default HikeAround;
