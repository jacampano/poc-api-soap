const fs = require('fs');
const xml2js = require('xml2js');

const parseXML = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            xml2js.parseString(data, { explicitArray: false }, (err, result) => {
                if (err) return reject(err);
                resolve(result || { tasks: [] });
            });
        });
    });
};

const buildXML = (filePath, data) => {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(data);
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, xml, 'utf8', err => {
            if (err) return reject(err);
            resolve();
        });
    });
};

module.exports = { parseXML, buildXML };
