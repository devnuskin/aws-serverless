'use strict';

let options = {
    origins: [], // if left blank then all domains will be allowed
    //origins: ["https://www.nuskin.com", "https://test.nuskin.com", "https://dev.nuskin.com"],
    allowCredentials: false,
    allowMethod: null,
    maxAge: null
};

module.exports = (handler) =>
    (event, context, callback) =>
        handler(event, context, (err, res) => {

            if (options.origins.length > 1) {
                let matchedCORS = options.origins
                    .map(o => o.trim())
                    .filter(o => o === event.headers.origin);

                if (matchedCORS.length > 0) {
                    res.headers = res.headers || {};
                    if (!!options.maxAge) {
                        res.headers["Access-Control-Max-Age"] = options.maxAge;
                    }
                    res.headers['Access-Control-Allow-Headers'] =
                        options.allowMethod ?
                            options.allowMethod.join(",")
                            : "GET,HEAD,PUT,PATCH,POST,DELETE";
                    res.headers['Access-Control-Allow-Credentials'] =
                        JSON.stringify(!!options.allowCredentials);
                    res.headers['Access-Control-Allow-Origin'] =
                        event.headers.origin;
                }

            } else {
                res.headers = res.headers || {};
                if (!!options.maxAge) {
                    res.headers["Access-Control-Max-Age"] = options.maxAge;
                }
                res.headers['Access-Control-Allow-Headers'] =
                    options.allowMethod ?
                        options.allowMethod.join(",")
                        : "GET,HEAD,PUT,PATCH,POST,DELETE";
                res.headers['Access-Control-Allow-Credentials'] =
                    JSON.stringify(!!options.allowCredentials);
                res.headers['Access-Control-Allow-Origin'] = "*";
            };
            callback(null, res);
        });




