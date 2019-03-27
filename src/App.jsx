import React from 'react';
import ReactDom from 'react-dom';

import ReactTurboRater from './ReactTurboRater';

ReactDom.render(
    <div>
        <h1>Custom content</h1>
        <ReactTurboRater
            accountId="16703b91-3136-4582-845a-30b5365b4b91"
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
            style={{
                width: '1px',
                minWidth: '100%',
            }}
            autoResize
            frameCSS="https://localhost:3004/example.css"
            frameScripts={[
                'https://localhost:3004/example.js',
            ]}
            onPageLoad={{
                general: () => {
                    console.log('on general page');
                },
                AUcomparison: () => {
                    console.log('got to last page! save this somewhere');
                },
            }}
            development
        />
    </div>,
    document.getElementById('root'),
);
