module.exports = {
    name: 'embed',
    type: 'dom',
    render(opts) {
        if (!opts.payload.html) {
            return '';
        }

        return opts.env.dom.createRawHTMLSection(opts.payload.html);
    }
};
