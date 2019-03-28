# React TurboRater
> TurboRater ([https://www.turborater.com/]()) offers comparative insurance rating. This library is a React Wrapper for their page (wraps it in an iframe).

### Introduction
First checkout the demo site provided by TurboRater: [https://16703b91-3136-4582-845a-30b5365b4b91.quotes.iwantinsurance.com/welcome.aspx]()
Feel free to click around and submit your info to test it out, hopefully you won't be quoted.

The UUID in the url is the account id for a specific TurboRater account.  You should have your own account id from your account admin.  To customize your own TurboRater page, you need to login to [https://quotes.iwantinsurance.com/admin/login.aspx?returnurl=agencycustomize.aspx]()

Once you login you will be presented with a 90s themed portal that has a lot of options to customize your TurboRater page. You can change the form options, e.g. make a field required. You can also add raw CSS and Javascript under the **Design** tab.

### Limitations
* CSS
    * If you have 2 sites that use the same iframe, you can't change the iframe style individually
    *  It's inefficient to write CSS code on their admin portal
* Can only inject 2 scripts
* Parent has zero visibility into the iframe
    * For example, what if you have want to track who signed up on the parent page and save it to your own system

### Props
> This library wraps the TurboRater page in an iframe and lets you easily add it to a React project. It addresses the limitations above, and offers additional goodies.

```javascript
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
```
```javascript
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
```
`accountId`: Your account id

`prefill`: Use this to prefill the form. For more details, check out [http://www.itcdataservices.com/support/ecmpfaq/afmviewfaq.aspx?faqid=357]()

`style`: Control the style of the iframe (the frame itself, not the content)

`autoResize`: Auto resize the iframe based it's content, uses [https://github.com/davidjbradshaw/iframe-resizer]()

`frameCSS`: CSS you want to inject into the iframe. Currently you are limited to inject just 1 file. So bundle your files if you have multiple.

`frameScripts`: Javascript files you want to inject into the iframe.

`onPageLoad`: An object with keys being page names, and values being callback functions. For example, if you want to add a callback when the initial page `https://16703b91-3136-4582-845a-30b5365b4b91.quotes.iwantinsurance.com/welcome.aspx` loads, then you set `onPageLoad` to

```javascript
{
	welcome: function callback(){
		console.log('welcome page loaded, do something with it');
	}
}
```

List of page names (case sensitive, without .aspx extention)

* welcome
* general
* namedInsured
* Spouse
* AddDrivers
* EditCar
* AddCars
* LimitPackages
* AUcomparison
* Finished

`development`: This allows you to inject a local copy of `react-turborater.js` into the iframe.  You must run it from a browser with cross domain security disabled. I found Safari to work best for this.

### Local Development
Checkout the repo and run the example app, that should be enough to get you started.

### Deploy to Production
Add `https://s3.amazonaws.com/leaseco-public/react-turborater.min.js` on TurboRater's admin portal