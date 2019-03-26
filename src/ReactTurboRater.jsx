import React from 'react';
import PropTypes from 'prop-types';
import querystring from 'querystring';

class ReactTurboRater extends React.Component {
    state = {
        loadingStyle: false,
    };
    componentDidMount() {
        window.addEventListener(
            'message',
            (event) => {
                switch (event.data.type) {
                    case 'pageLoad':
                        if (this.props.css) {
                            this.setState({ loadingStyle: true });
                            window.frames['insurance-frame'].contentWindow.postMessage(
                                { type: 'loadCSS', css: this.props.css },
                                '*',
                            );
                        }
                        window.frames['insurance-frame'].contentWindow.postMessage(
                            { type: 'loadScript', scripts: this.props.scripts },
                            '*',
                        );
                        this.handlePageLoad(event.data.page);
                        break;
                    case 'cssLoaded':
                        this.setState({ loadingStyle: false });
                }
            },
            false,
        );

        if (!this.props.development) return;

        document.getElementById('insurance-frame').onload = () => {
            const contentDocument = window.frames['insurance-frame'].contentDocument;
            const myscript = contentDocument.createElement('script');
            myscript.type = 'text/javascript';
            myscript.src = 'https://localhost:3004/turborater-bridge.js';
            contentDocument.head.appendChild(myscript);
        };
    }
    handlePageLoad(page) {
        const pageId = page
            .split('/')
            .pop()
            .split('.')
            .shift();
        const handler = this.props.onPageLoad[pageId];
        if (handler) {
            handler();
        }
    }
    render() {
        const queryParams = querystring.stringify(this.props.prefill);
        const frameSrc = `https://${
            this.props.accountId
        }.quotes.iwantinsurance.com/welcome.aspx?${queryParams}`;
        return (
            <iframe
                id="insurance-frame"
                title="insurance"
                src={frameSrc}
                style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '800px',
                    border: 'solid 0px #ccc',
                    opacity: this.props.css && this.state.loadingStyle ? 0 : 1,
                }}
            />
        );
    }
}

ReactTurboRater.propTypes = {
    accountId: PropTypes.string.isRequired,
    prefill: PropTypes.shape({
        patner: PropTypes.string,
        fname: PropTypes.string,
        lname: PropTypes.string,
        email: PropTypes.string,
        cph: PropTypes.string,
        wph: PropTypes.string,
        hph: PropTypes.string,
        ad1: PropTypes.string,
        ad2: PropTypes.string,
        city: PropTypes.string,
        st: PropTypes.string,
        zip: PropTypes.string,
        dob: PropTypes.string,
        gen: PropTypes.string,
        mstat: PropTypes.string,
        vin: PropTypes.string,
    }),
    css: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string),
    onPageLoad: PropTypes.shape({
        welcome: PropTypes.func,
        general: PropTypes.func,
        namedInsured: PropTypes.func,
        Spouse: PropTypes.func,
        AddDrivers: PropTypes.func,
        EditCar: PropTypes.func,
        AddCars: PropTypes.func,
        LimitPackages: PropTypes.func,
        AUcomparison: PropTypes.func,
        Finished: PropTypes.func,
    }),
    development: PropTypes.bool,
};

ReactTurboRater.defaultProps = {
    onPageLoad: {},
};
export default ReactTurboRater;
