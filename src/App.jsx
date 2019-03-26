import React from 'react';
import ReactDom from 'react-dom';

import ReactTurboRater from './ReactTurboRater';

ReactDom.render(
    <ReactTurboRater
        accountId="3d2991dd-a44d-47a2-bf90-9fd026e06009"
        prefill={{
            patner: 'Sky',
            fname: 'AnMarie',
            lname: 'Testing',
            email: 'anmarie@test.com',
            cph: '800-383-3482',
            wph: '972-820-1162',
            hph: '214-123-4567',
            ad1: '1415 Halsey Way',
            ad2: 'Suite 314',
            city: 'Carrollton',
            st: 'TX',
            zip: '75007',
            dob: '07/01/1980',
            gen: 'M',
            mstat: 'M',
            vin: '1HGCR2E7-E',
        }}
        css="https://localhost:3004/leaseco.css"
        scripts={['https://localhost:3004/test.js']}
        onPageLoad={{
            general: () => {
                console.log('on general page');
            },
            AUcomparison: () => {
                console.log('got to last page! save this somewhere');
            },
        }}
        development
    />,
    document.getElementById('root'),
);
