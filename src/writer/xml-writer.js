const xmlBuilder = require('xmlbuilder');

const Stream = require('stream');

const write = (stream, data) => {
    let root = xmlBuilder.create('root');
    data.forEach(element => {
        root.ele('tsvalue', { i: element.tsDate }, element.tsValue).end();
    });

    return root.end({ pretty: true });
};

const _transform = (data) => {
    return `
    <TimeSeriesValue i="${data.tsDate}">${data.tsValue}</TimeSeriesValue>`;
};

const stream = () => {
    const stream = new Stream.Transform({
        objectMode: true,

        transform: (data, _, done) => {
            done(null, _transform(data));
        },

        final: done => {
            stream.push('\n</TimeSeriesValues>');
            done(null);
        }
    });

    stream.on('pipe', () => {
        stream.push('<TimeSeriesValues>');
    });

    return stream;
};

module.exports = { write, stream };
