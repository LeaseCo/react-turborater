import React from 'react';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import { iframeResizer } from 'iframe-resizer';

class ReactTurboRater extends React.Component {
    state = {
        loadingFrameCSS: false,
    };
    componentDidMount() {
        window.addEventListener(
            'message',
            (event) => {
                switch (event.data.type) {
                    case 'pageLoad': {
                        if (this.props.frameCSS) {
                            this.setState({ loadingFrameCSS: true });
                            window.frames['insurance-frame'].contentWindow.postMessage(
                                { type: 'loadCSS', css: this.props.frameCSS },
                                '*',
                            );
                        }

                        const scripts = this.props.autoResize
                            ? [
                                  ...this.props.frameScripts,
                                  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.0.4/iframeResizer.contentWindow.min.js',
                              ]
                            : this.props.frameScripts;
                        window.frames['insurance-frame'].contentWindow.postMessage(
                            { type: 'loadScript', scripts },
                            '*',
                        );
                        this.handlePageLoad(event.data.page);
                        break;
                    }
                    case 'cssLoaded': {
                        this.setState({ loadingFrameCSS: false });
                    }
                }
            },
            false,
        );

        if (this.props.autoResize) {
            iframeResizer({}, '#insurance-frame');
        }

        if (!this.props.development) return;

        document.getElementById('insurance-frame').onload = () => {
            const contentDocument = window.frames['insurance-frame'].contentDocument;
            const myscript = contentDocument.createElement('script');
            myscript.type = 'text/javascript';
            myscript.src = 'https://s3.amazonaws.com/leaseco-public/react-turborater.min.js';
            contentDocument.head.appendChild(myscript);
        };
    }
    handlePageLoad = (page) => {
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
        const frameStyle = this.props.frameCSS
            ? {
                  ...this.props.style,
                  opacity: this.props.frameCSS && this.state.loadingFrameCSS ? 0 : 1,
              }
            : this.props.style;
        return (
            <iframe
                id="insurance-frame"
                title="insurance"
                frameBorder="0"
                src={frameSrc}
                style={frameStyle}
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
    style: PropTypes.object,
    autoResize: PropTypes.bool,
    frameCSS: PropTypes.string,
    frameScripts: PropTypes.arrayOf(PropTypes.string),
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
    prefill: {},
    style: {
        width: '100%',
        height: '100%',
        minHeight: '800px',
        border: 'solid 3px #000',
    },
    autoResize: false,
    frameCSS: '',
    frameScripts: [],
    onPageLoad: {},
    development: false,
};
export default ReactTurboRater;
