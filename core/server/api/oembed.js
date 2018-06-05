const common = require('../lib/common');
const {extract, hasProvider} = require('oembed-parser');
const Promise = require('bluebird');

let oembed = {
    read(options) {
        let {url} = options;

        if (!url || !url.trim()) {
            return Promise.reject(new common.errors.BadRequestError({
                message: common.i18n.t('errors.api.oembed.noUrlProvided')
            }));
        }

        if (!hasProvider(url)) {
            // sometimes the providers list only has one scheme rather than
            // http + https so attempt to find both versions
            if (url.match(/^https:/)) {
                url = url.replace(/^https:/, 'http:');
            } else if (url.match(/^http:/)) {
                url = url.replace(/^http:/, 'https');
            }

            if (!hasProvider(url)) {
                return Promise.reject(new common.errors.ValidationError({
                    message: common.i18n.t('errors.api.oembed.unknownProvider')
                }));
            }
        }

        return extract(url).catch((err) => {
            return Promise.reject(new common.errors.InternalServerError({
                message: err.message
            }));
        });
    }
};

module.exports = oembed;
