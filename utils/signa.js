

const ncaModules = {
    commonUtils: 'kz.gov.pki.knca.commonUtils',
};

const storageName = {
    PKCS12: 'PKCS12'
};

const keyType = {
    signature: 'SIGNATURE'
};

export class Signa {
    constructor() {
        this.webSocket = null;
    }

    init(cb) {
        this.webSocket = new WebSocket('wss://127.0.0.1:13579/');
        this.webSocket.onopen = (event) => this.defaultModule(cb);

        this.webSocket.onclose = (event) => {
            if (event.wasClean) {
                console.log('NCA Layer connection has been closed');
            } else {
                console.log('NCA Layer connection error');
                this.showErrDialog('Ошибка при подключении к NCA Layer. Запустите NCALayer и нажмите ОК')
                // Если используете кастомный modal.confirm, то можно показать юзеру ссылку на скачивание NcaLayer
                // <a href="https://pki.gov.kz/ncalayer" target="_blank" class="text-underline">Ссылка для скачивания</a>
            }
            console.log(`Code: ${event.code} Reason: ${event.reason}`);
        };
    }

    defaultModule(cb) {
        this.webSocket.onmessage = (event) => {
            if (!(event && event.data)) return;
            this.hasValidationErrors = false;
            if (typeof cb === 'function') {
                return cb();
            }
        };
    }

    checkConnection(cb) {
        if (typeof cb !== 'function') return;

        if (
            this.webSocket &&
            this.webSocket.readyState === WebSocket.OPEN &&
            !this.hasValidationErrors
        ) {
            return cb();
        }

        return this.init(cb);
    }

    sendMessage(data, cb, ...args) {
        this.checkConnection(() => {
            this.webSocket.send(JSON.stringify(data));
            this.webSocket.onmessage = (event) => {
                if (!(event && event.data)) return;
                const res = JSON.parse(event.data);
                cb(res.responseObject, ...args);
                // if (res.code === '200' && typeof cb === 'function') {
                //     cb(res.responseObject, ...args);
                // }
                this.close();
            };
        });
    }
    close() {
        if (!this.webSocket) return;
        this.webSocket.close(1000, 'Work complete!');
        this.webSocket = null;
    }
    showErrDialog(descr) {
        const result = window.confirm(descr);

        if (result) {
            this.close();
            this.init();
        } else {
            this.close();
        }
    }

    /* Подпись XML */
    signXml(data, cb) {
        const body = {
            args: [storageName.PKCS12, keyType.signature, data, '', ''],
            method: 'signXml',
            module: ncaModules.commonUtils,
        };

        this.sendMessage(body, cb);
    }

    /* Подпись массива XML */
    signXmls(data, cb) {
        const body = {
            args: [storageName.PKCS12, keyType.signature, data, '', ''],
            method: 'signXmls',
            module: ncaModules.commonUtils,
        };

        this.sendMessage(body, cb);
    }

    /* Подпись файла в формате CMS */
    createCAdESFromFile(filePath, cb, includeData = false) {
        const body = {
            args: [storageName.PKCS12, keyType.signature, filePath, includeData],
            method: 'createCAdESFromFile',
            module: ncaModules.commonUtils,
        };

        this.sendMessage(body, cb);
    }

    /* Подпись Base64 данных в формате CMS */
    createCMSSignatureFromBase64(base64ToSign, cb, includeData = false) {
        const body = {
            args: [storageName.PKCS12, keyType.signature, base64ToSign, includeData],
            method: 'createCAdESFromBase64',
            module: ncaModules.commonUtils,
        };

        this.sendMessage(body, cb);
    }

    /* Подпись хэша данных Base64 в формате CMS */
    createCAdESFromBase64Hash(base64ToSign, cb) {
        const body = {
            args: [storageName.PKCS12, keyType.signature, base64ToSign],
            method: 'createCAdESFromBase64Hash',
            module: ncaModules.commonUtils,
        };

        this.sendMessage(body, cb);
    }

    /* Получить данные ключа */
    getKeyInfo(cb) {
        const body = {
            module: ncaModules.commonUtils,
            method: 'getKeyInfo',
            args: [storageName.PKCS12],
        };
        this.sendMessage(body, cb);
    }

    /* Распарсить свойство SubjectDN. Одно из свойств в ответе метода getKeyInfo */
    getSubjectDN(str) {
        if (typeof str !== 'string') return;

        const obj = {};
        str = str.split(',');

        if (!str.length) return;

        str.forEach((pair) => {
            const tmp = pair.split('=');
            obj[tmp[0].trim()] = tmp[1].trim();
        });

        return {
            iin: obj.SERIALNUMBER ? obj.SERIALNUMBER.replace('IIN', '') : null,
            bin: obj.OU ? obj.OU.replace('BIN', '') : null,
            email: obj.E ? obj.E.toLowerCase() : obj.EMAILADDRESS ? obj.EMAILADDRESS : null,
            name: obj.CN
                ? obj.CN.replace(
                    /[\wа-яЁА-ЯЁ]\S*/g,
                    (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(),
                )
                : null,
            title: obj.O ? obj.O.replace(/"/g, '').replace(/\\/g, '\'') : null,
        };
    }
}

const signa = new Signa();

function signAll () {
    const xmlToSign = '<xml></xml>';
    signa.signXml(xmlToSign, (ncaResponse) => postSignedXml(ncaResponse, id))
}

function postSignedXml (ncaResponse, id) {
    console.log(id)
}
