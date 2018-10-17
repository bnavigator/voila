/***************************************************************************
* Copyright (c) 2018, Voila contributors                                   *
*                                                                          *
* Distributed under the terms of the BSD 3-Clause License.                 *
*                                                                          *
* The full license is in the file LICENSE, distributed with this software. *
****************************************************************************/

var requirePromise = function (pkg) {
    return new Promise(function (resolve, reject) {
        var require = window.require;
        if (require === undefined) {
            reject('Requirejs is needed, please ensure it is loaded on the page.');
        }
        else {
            require(pkg, resolve, reject);
        }
    });
};

export function requireLoader(moduleName, moduleVersion) {
    return requirePromise(["" + moduleName]).catch(function (err) {
        var failedId = err.requireModules && err.requireModules[0];
        if (failedId) {
            console.log(`Falling back to unpkg.com for ${moduleName}@${moduleVersion}`);
            return requirePromise([`https://unpkg.com/${moduleName}@${moduleVersion}/dist/index.js`]);
        }
    });
}
