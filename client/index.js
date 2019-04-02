'use strict'
let euriklis = (typeof exports === "undefined") ? (function euriklis() { }) : (exports);
if (typeof global !== "undefined") { global.euriklis = euriklis }
euriklis.version = '1.01'
euriklis.html = function html(element) {
    /**
     * install the html node
     * package if it is needed.
    */

    if (typeof process !== "undefined") {
        if (typeof process.env !== "undefined") {
            const jsdom = require('jsdom-no-contextify');
            const { JSDOM } = jsdom;
            const { document } = (new JSDOM(`...`)).window;
        }
    }
    this.document = document || window.document;

    this.currentNode = typeof element === "undefined" ? this.document
        : this.document.querySelector(element);

}
euriklis.html.prototype.insertData = function (data, savePreviousData) {
    if (this.data) {
        if (this.data.constructor === Array && data.constructor === Array) {
            this.data = savePreviousData ? this.data.concat(data) : data;
        } else {
            if (this.data.constructor === Object && data.constructor === Object) {
                this.data = savePreviousData ? Object.assign(this, data, data) : data;
            }
        }
    } else this.data = data;
    return this;
}
euriklis.html.ready = function (readyFunction) {
    document.addEventListener("DOMContentLoaded", readyFunction)
}
euriklis.html.prototype.selectAll = function (element) {
    if (this.currentNode === null) this.currentNode = document.querySelectorAll(element);
    else this.currentNode = this.currentNode.querySelectorAll(element);
    return this;
}
euriklis.html.prototype.eq = function (c) {
    if (!isNaN(c) && this.currentNode[c] !== "undefined") {
        let node = new euriklis.html();
        node.currentNode = this.currentNode[c];
        return node;
    } else throw new Error("the index do not exists!!!");
}
euriklis.html.prototype.append = function (element, count) {
    "use strict";
    count = count || 1;
    let node = new euriklis.html();
    if (isNaN(count) && !Number.isInteger(Number(count))) throw new Error("the count argument can be integer number!!!");
    let svg = "http://www.w3.org/2000/svg",
        isSVG = (element) => {
            let svgElements = ['altGlyph',
                'altGlyphDef',
                'altGlyphItem',
                'animate',
                'animateColor',
                'animateMotion',
                'animateTransform',
                'circle',
                'clipPath',
                'color-profile',
                'cursor',
                'defs',
                'desc',
                'ellipse',
                'feBlend',
                'feColorMatrix',
                'feComponentTransfer',
                'feComposite',
                'feConvolveMatrix',
                'feDiffuseLighting',
                'feDisplacementMap',
                'feDistantLight',
                'feFlood',
                'feFuncA',
                'feFuncB',
                'feFuncG',
                'feFuncR',
                'feGaussianBlur',
                'feImage',
                'feMerge',
                'feMergeNode',
                'feMorphology',
                'feOffset',
                'fePointLight',
                'feSpecularLighting',
                'feSpotLight',
                'feTile',
                'feTurbulence',
                'filter',
                'font',
                'font-face',
                'font-face-format',
                'font-face-name',
                'font-face-src',
                'font-face-uri',
                'foreignObject',
                'g',
                'glyph',
                'glyphRef',
                'hkern',
                'image',
                'line',
                'linearGradient',
                'marker',
                'mask',
                'metadata',
                'missing-glyph',
                'mpath',
                'path',
                'pattern',
                'polygon',
                'polyline',
                'radialGradient',
                'rect',
                'set',
                'stop',
                'svg',
                'switch',
                'symbol',
                'text',
                'textPath',
                'title',
                'tref',
                'tspan',
                'use',
                'view',
                'vkern'
            ]
            return svgElements.some(el => { return el === element })
        };
    if (typeof element === "string") {
        if (this.currentNode.constructor !== NodeList) {
            /*this.currentNode = isSVG(element) ?
                this.currentNode.appendChild(document.createElementNS(svg, element))
                : this.currentNode.appendChild(document.createElement(element));*/
            console.log(isSVG(element))
            if (count > 1) {
                let fragment = document.createDocumentFragment();
                for (let i = 0; i < count; i++) {
                    isSVG(element) ? fragment.appendChild(document.createElementNS(svg, element))
                        : fragment.appendChild(document.createElement(element));
                }
                this.currentNode.appendChild(fragment);
                node.currentNode = this.currentNode.childNodes;
            } else node.currentNode = isSVG(element) ?
                this.currentNode.appendChild(document.createElementNS(svg, element))
                : this.currentNode.appendChild(document.createElement(element));
        }
        else {
            //[].forEach.call(this.currentNode, function (el) {
            /*isSVG(element) ? el = el.appendChild(document.createElementNS(svg, element))
                : el = el.appendChild(document.createElement(element));*/
            //});
            if (count > 1) {
                console.log(isSVG(element));
                let fragment = document.createDocumentFragment();
                for (let i = 0; i < count; i++) {
                    isSVG(element) ? fragment.appendChild(document.createElementNS(svg, element))
                        : fragment.appendChild(document.createElement(element));
                }
                [].forEach.call(this.currentNode, function (el) {
                    this.currentNode.appendChild(fragment);
                    node.currentNode = this.currentNode.childNodes;
                });
            } else {
                console.log(isSVG(element));
                node.currentNode = this.currentNode;
                [].forEach.call(node.currentNode, function (el) {
                    isSVG(element) ? el = el.appendChild(document.createElementNS(svg, element))
                        : el = el.appendChild(document.createElement(element));
                });
            }
        }
    } else {
        if (this.currentNode.constructor !== NodeList) {
            //this.currentNode = this.currentNode.appendChild(element);
            if (count > 1) {
                let fragment = document.createDocumentFragment();
                for (i = 0; i < count; i++) fragment.appendChild(element);
                this.currentNode.appendChild(fragment);
                node.currentNode = this.currentNode.childNodes;
            } else {
                node.currentNode = this.currentNode.appendChild(element);
            }
        }
        else {
            /*[].forEach.call(this.currentNode, function (el) {
                el = el.appendChild(element);
            })*/
            if (count > 1) {
                //to do this correctly!!!
                let fragment = document.createDocumentFragment();
                node.currentNode = this.currentNode;
                for (i = 0; i < count; i++) fragment.appendChild(element);
                [].forEach.call(node.currentNode, function (el) {
                    el = el.appendChild(fragment).childNodes;
                })
            } else {
                node.currentNode = this.currentNode;
                [].forEach.call(node.currentNode, function (el) {
                    el = el.appendChild(element);
                });
            }
        }
    }
    return node;
}
euriklis.html.prototype.attr = function (attr, val) {
    'use strict';
    if (typeof attr === 'string') {
        if (this.currentNode.constructor !== NodeList) this.currentNode.setAttribute(attr, val);
        else if (this.currentNode.constructor === NodeList) {
            [].forEach.call(this.currentNode, function (el) {
                el.setAttribute(attr, val);
            })
        }
    } else {
        if (attr instanceof Object && typeof val === "undefined") {
            let keys = Object.keys(attr), kn = keys.length, i;
            for (i = 0; i < kn; i++) {
                if (this.currentNode.constructor !== NodeList) this.currentNode.setAttribute(keys[i], attr[keys[i]]);
                else if (this.currentNode.constructor === NodeList) {
                    [].forEach.call(this.currentNode, function (el) {
                        el.setAttribute(keys[i], attr[keys[i]]);
                    })
                }
            }
        } else throw new Error("Incorrect insided attr argument!!!");
    }
    return this;
}
euriklis.html.prototype.text = function (txt) {
    if (this.currentNode.constructor !== NodeList) {
        if (typeof txt === "string" || typeof txt === "number") this.currentNode.textContent = txt;
        else {
            if (txt.constructor === Function) this.currentNode.textContent = txt();
            else throw new Error("the text argument can be only string, number or function");
        }
    } else {
        if (this.currentNode.constructor === NodeList) {
            [].forEach.call(this.currentNode, function (element) {
                if (typeof txt === "string" || typeof txt === "number") element.textContent = txt;
                else {
                    if (txt.constructor === Function) element.currentNode.textContent = this.__runData(txt);
                    else throw new Error("the text argument can be string or function that returns string")
                }
            })
        }
    }
    return this;
}
euriklis.html.prototype.select = function (element) {
    if (typeof element === "string") this.currentNode = this.currentNode.querySelector(element);
    else {
        if (element.constructor === Function) {
            return this.select(element());
        }
        else throw new Error("The element argument can be only string type!!!");
    }
    return this;
}
euriklis.html.prototype.on = function (event, eventFunction) {
    if (eventFunction.constructor !== Function) throw new Error("the second argument" +
        " of the on property can be function!!!");
    if (this.currentNode.constructor === NodeList) [].forEach
        .call(this.currentNode, function (element) { element.addEventListener(event, eventFunction); })
    else this.currentNode.addEventListener(event, eventFunction);
    return this;
}

euriklis.html.prototype.css = euriklis.html.prototype.style = function (css) {
    "use strict"
    if (css.constructor !== Object) throw new Error("the css argument can be only object or JSON type!!!");
    let i, css_properties = Object.keys(css);
    if (this.currentNode.constructor === NodeList) {
        [].forEach.call(this.currentNode, function (node, j) {
            for (i = 0; i < css_properties.length; i++) {
                if (css[css_properties[i]].constructor === String) {
                    node.style[css_properties[i]] = css[css_properties[i]];
                }
                if (css[css_properties[i]] instanceof Array) node.style[css_properties[i]] = css[css_properties[i]][j]
            }
        })
    } else {
        for (i = 0; i < css_properties.length; i++) this.currentNode.style[css_properties[i]] = css[css_properties[i]];
    }
    return this;
}
euriklis.html.prototype.parent =
    euriklis.html.prototype.parentNode =
    function () {
        if (this.currentNode.constructor !== NodeList) {
            this.currentNode = this.currentNode.parentNode
        } else {
            if (this.currentNode.constructor === NodeList) return this.eq(0).parent()
        }
        return this;
    }
euriklis.html.prototype.children =
    euriklis.html.prototype.childNodes =
    function () {
        "use strict";
        if (this.currentNode.constructor === NodeList) return this.eq(0).children();
        else {
            this.currentNode = this.currentNode.childNodes;
        }
        return this;
    }
euriklis.html.prototype.property = function (prop) {
    if (!(typeof prop === "string")) throw new Error("The property can be only string!!!");
    if (!(this.currentNode instanceof NodeList)) return this.currentNode.getAttribute(prop);
    else return Array.from({ length: this.currentNode.length }).map((el, i) => {
        el = this.currentNode[i].getAttribute(prop);
        return el;
    });
}
euriklis.html.prototype.getCss = function (propertys) {
    "use strict";
    let style;
    if (!(this.currentNode instanceof NodeList)) {
        style = this.currentNode.currentStyle || window.getComputedStyle(this.currentNode);
        return style[propertys];
    } else {
        return Array
            .from({ length: this.currentNode.length })
            .map((el, i) => {
                style = this.currentNode[i].currentStyle || window.getComputedStyle(this.currentNode[i]);
                el = style[propertys];
                return el;
            });
    }
}
euriklis.html.http = function Http () {
    /**
     * Helper for http calls
     * @param method
     * @param url
     * @param data
     * @returns {Promise}
     */
    function makeRequest(method,url,data) {
        var data = data || '';
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, url);

            req.onload = function() {
                if (req.status == 200) {
                    resolve(req);
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error("Something went wrong ... "));
            };
            req.send(data);
        });
    }
    this.makeRequest = makeRequest
}
euriklis.html.usage_add2DAxisX = ("This function creates an x axis fro @D graphics environment." +
    "To create an axis x you can inside the following arguments:" +
    "domain --> two-dimensional array type variable that contains the pixels coordinats of the axis from," +
    "range --> also two dimensional array type variable that contains the data range that user would like to visualize." +
    "coolor --> the color that have to be the axis, " +
    "width --> the pixels width of the axis, " +
    "type --> string variable that " +
    "describes the type of the data of the x axis. On default is set to numeric, " +
    "and can get only one value - 'date' or 'dateTime'" +
    "intervals --> the intervals that must have the axis coordinagtes" +
    "position --> string variable that can be bottom or top. By default is bottom"
)
euriklis.html.prototype.add2DAxisX1 = function (params) {
    // Algorithm for partition of the x axis
    // for given range and domain.  Autor: VSK
    // start of Algorithm APXAR ...
    function APXAR(range, domain, type) {
        'use strict'
        const isDate = (date) => {
            return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date))
        }
        const getDateFrequency = (date) => {
            let dtAsStr = ''
            if (Date.parse(date) === NaN) throw new Error("Incorrect Date input.")
            dtAsStr = new Date(date).getFullYear().toString()
            if (date.indexOf('-') === -1 && date.indexOf('/') === -1) {
                // the date is possible annual
                if (date === dtAsStr) return 'annual'
            } else {
                // the date is probably monthly
                let dt = new Date(date),
                    iso_ = date.indexOf('-') !== -1,
                    isoSlash = date.indexOf('/') !== -1
                if (iso_ && isoSlash) throw new Error('Incorrect date.')
                if (isoSlash) date = date.replace('/', '-')
                dtAsStr += '-' + ((dt.getMonth() + 1) < 10 ? ('0' + (dt.getMonth() + 1)) : (dt.getMonth() + 1))
                if (date === dtAsStr) {
                    return 'yyyy-mm'
                } else {
                    // the date is probably daily
                    dtAsStr += '-' + (dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate())
                    let isDaily = date === dtAsStr
                    if (isDaily) return 'yyyy-mm-dd'
                    else {
                        // the date is probably yyyy-mm-ddThh
                        dtAsStr += 'T' + (dt.getHours() < 10 ? ('0' + dt.getHours()) : dt.getHours())
                        let isHourly = date === dtAsStr
                        if (isHourly) return 'yyyy-mm-ddThh'
                        else {
                            // the date is probably yyyy-mm-ddThh:mm
                            dtAsStr += ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
                            let isMinutes = date === dtAsStr
                            if (isMinutes) return 'yyyy-mm-ddThh:mm'
                            else {
                                // the date is probably yyyy-mm-ddThh:mm-ss
                                dtAsStr += ':' + (dt.getSeconds() < 10 ? ('0' + dt.getSeconds()) : dt.getSeconds())
                                let isSec = date === dtAsStr
                                if (isSec) return 'yyyy-mm-ddThh:mm:ss'
                                else {
                                    throw new Error('Non acceptable date type!')
                                }
                            }
                        }
                    }
                }
            }
        }
        const dateDiffWeekly = (d1, d2) => {
            if (!(d1 instanceof Date)) d1 = new Date(d1)
            if (!(d2 instanceof Date)) d2 = new Date(d2)
            return Math.round((d1 - d2) / 604800000)
        },
            dateDiffDaily = (d1, d2) => {
                if (!(d1 instanceof Date)) d1 = new Date(d1)
                if (!(d2 instanceof Date)) d2 = new Date(d2)
                return Math.round((d1 - d2) / 86400000)
            },
            dateDiffHourly = (d1, d2) => {
                if (!(d1 instanceof Date)) d1 = new Date(d1)
                if (!(d2 instanceof Date)) d2 = new Date(d2)
                return Math.round((d1 - d2) / 3600000)
            },
            dateDiffMinutes = (d1, d2) => {
                if (!(d1 instanceof Date)) d1 = new Date(d1)
                if (!(d2 instanceof Date)) d2 = new Date(d2)
                return Math.round((d1 - d2) / 60000)
            },
            dateDiffInSeconds = (d1, d2) => {
                if (!(d1 instanceof Date)) d1 = new Date(d1)
                if (!(d2 instanceof Date)) d2 = new Date(d2)
                return Math.round((d1 - d2) / 1000)
            },
            formatDate = (date, format) => {

                let result = new Date(date)
                    .getFullYear()
                    .toString(), dt = new Date(date)
                if (format === 'yyyy') return result
                if (format.indexOf('yyyy-mm') !== -1) {
                    result = result
                        .concat('-')
                        .concat(dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1)
                }
                if (format.indexOf('yyyy-mm-dd') !== -1) {
                    result = result
                        .concat('-')
                        .concat(dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate())
                }
                if (format.indexOf('yyyy-mm-ddThh') !== -1) {
                    result = result
                        .concat('T')
                        .concat(dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours())
                }
                if (format.indexOf('yyyy-mm-ddThh:mm') !== -1) {
                    result = result.concat(':')
                        .concat(dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
                }
                if (format.indexOf('yyyy-mm-ddThh:mm:ss') !== -1) {
                    result = result.concat(':')
                        .concat(dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds())
                }
                return result
            }
        let w = domain[1] - domain[0],
            // initializations:
            i, j, len, m, p, step, temp, tempStep, tempStep2str,
            oldTemp = 0, oldTempStep = '', typeOfRange = null, point,
            rngIsArr, rngIs2dim, d, d1, status, dr, meanWidth,
            step2str, errMsg = 'Uncorrect range elements.',
            dateFreqs, statuses, roundedRange = [], residual,
            lastDigit, partition, partitions, partitionCandidates,
            yearLen1, yearLen2, dateTimeFrequency = null,
            listRange = [], listDomain = [], lambda = 7,
            mju, epsilon = 5
        // step 1:
        // if range is array
        rngIsArr = range instanceof Array
        // and if range is 2 dimensional
        rngIs2dim = range.length === 2
        if (rngIsArr && rngIs2dim) {
            // if every element of range is 
            // number then typeOfRange is numeric ...
            if (type !== 'date' && range.every(element => { return !isNaN(element) })) {
                typeOfRange = 'numeric'
            } else {
                if (type === "date" && range.every(element => { return isDate(element) })) typeOfRange = 'date'
                else throw new Error('Uncorrect type of the range.')
            }
        } else throw new Error('Uncorrect structure of the range dimension')
        // step 2: Check if the range is correct ...
        if (typeOfRange === 'numeric') {
            if (range[1] < range[0]) throw new Error(errMsg)
        } else {
            if (Date.parse(range[1]) < Date.parse(range[0])) {
                throw new Error(errMsg)
            }
        }
        // step 3: If the range is numeric preprocess
        // the data (round and stringify the range suitably)
        // from this step we need a while loop and swich - case
        // operators ...
        status = '3'
        while (status) {
            switch (status) {
                case '3':
                    if (typeOfRange === 'date') {
                        status = '4'
                        break
                    }
                    i = 0
                    status = '3.a'
                    break
                case '3.a':
                    if (i > 1) {
                        status = '5'
                        break
                    }
                    len = range[i].toString().length
                    if (len === 1 || (len === 2 && range[i].toString().charAt(0) === '-')) {
                        // if the range[i] is a single
                        // digit number do not change it.
                        roundedRange[i] = range[i].toString()
                        i += 1
                        status = '3.a'
                        break
                    } else {
                        lastDigit = parseInt(range[i].toString()[len - 1])
                        roundedRange[i] = range[i].toString().substring(0, len - 1)
                        if (i === 0) {
                            // the first element of range...
                            if (lastDigit < 5) {
                                // set the latest digit to zero
                                // if is less than 5 else set it
                                // to be equals to 5...
                                roundedRange[i] = roundedRange[i].concat('0')
                            } else roundedRange[i] = roundedRange[i].concat('5')
                        } else {
                            // second element of the range
                            if (lastDigit <= 5) {
                                // if the last digit is zero do not change it
                                // otherwise set it to 5
                                if (lastDigit === 0) roundedRange[i] = roundedRange[i].concat('0')
                                else roundedRange[i] = roundedRange[i].concat('5')
                            } else {
                                // find the index of the floating
                                // point in the range ...
                                point = range[i].toString().indexOf('.')
                                if (point === 0) throw new Error('The point is uncorrectly located.')
                                // if floating point do not exists ...
                                if (point === -1) residual = 10
                                else residual = Math.pow(10, point + 2 - len)
                                roundedRange[i] = Number(roundedRange[i].concat('0'))
                                roundedRange[i] += residual
                                roundedRange[i] = roundedRange[i].toString()
                            }
                        }
                    }
                    i += 1
                    status = '3.a'
                    break
                case '4':
                    // date type data ...
                    if (range.every(element => { return getDateFrequency(element) === 'annual' })) {
                        range = range.map(element => { return element = parseInt(element) })
                        dateTimeFrequency = 'yyyy'
                        typeOfRange = 'numeric'
                        status = '3'
                        break
                    }
                    if (range.every(element => { return getDateFrequency(element) === 'yyyy-mm' })) {
                        roundedRange = range
                        dateTimeFrequency = 'yyyy-mm'
                        status = '6'
                        break
                    }
                    // if every element is yyy-mm-dd form:
                    if (range.every(element => { return getDateFrequency(element) === 'yyyy-mm-dd' })) {
                        i = 0
                        dateTimeFrequency = 'yyyy-mm-dd'
                        status = '4.a'
                        break
                    }
                    if (range.every(element => { return getDateFrequency(element) === 'yyyy-mm-ddThh' })) {
                        i = 0
                        dateTimeFrequency = 'yyyy-mm-ddThh'
                        status = '4.b'
                        break
                    }
                    if (range.every(element => { return getDateFrequency(element) === 'yyyy-mm-ddThh:mm' })) {
                        i = 0
                        dateTimeFrequency = 'yyyy-mm-ddThh:mm'
                        status = '4.c'
                        break
                    }
                    if (range.every(element => getDateFrequency(element) === 'yyyy-mm-ddThh:mm:ss')) {
                        i = 0
                        dateTimeFrequency = 'yyyy-mm-ddThh:mm:ss'
                        status = '4.d'
                        break
                    }
                case '4.a':
                    if (i > 1) {
                        status = '6'
                        break
                    }
                    if (i === 0) {
                        d = new Date(range[i])
                        d1 = new Date()
                        d1.setYear(d.getFullYear())
                        d1.setMonth(d.getMonth())
                        d1.setDate(1)
                    } else {
                        d = new Date(range[i])
                        d1 = new Date(d.getFullYear(), d.getMonth() + 1, 0)
                    }
                    roundedRange[i] = formatDate(d1, 'yyyy-mm-dd')
                    i += 1
                    status = '4.a'
                    break
                case '4.b':
                    if (i > 1) {
                        status = '6'
                        break
                    }
                    d = new Date(range[i])
                    if (i === 0) {
                        d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0)
                    } else d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 24)
                    roundedRange[i] = formatDate(d1, 'yyyy-mm-ddThh')
                    i += 1
                    status = '4.b'
                    break
                case '4.c':
                    if (i > 1) {
                        status = '6'
                        break
                    }
                    d = new Date(range[i])
                    if (i === 0) {
                        d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 0)
                    } else d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 60)
                    roundedRange[i] = formatDate(d1, 'yyyy-mm-ddThh:mm')
                    i += 1
                    status = '4.c'
                    break
                case "4.d":
                    if (i > 1) {
                        status = '6'
                        break
                    }
                    d = new Date(range[i])
                    if (i === 0) {
                        d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0)
                    } else d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 60)
                    roundedRange[i] = formatDate(d1, 'yyyy-mm-ddThh:mm:ss')
                    i += 1
                    status = '4.d'
                    break
                case '5':
                    // make the partition for 
                    // numbers and annually
                    // described dates ...
                    // INITIALIZATIONS:
                    // Get the range difference
                    dr = Number(roundedRange[1]) - Number(roundedRange[0])
                    // set m to 0, that is the index
                    // of the current symbol.
                    m = 0
                    // get the mean width of every 
                    // symbol that will be used in
                    // the partition of the axis.
                    meanWidth = 0.5 * (roundedRange[0].length + roundedRange[1].length) | 0
                    // record the previous partition
                    // for a given number of digits.
                    oldTemp = 0
                    status = '5.a' // go to 5.a
                    break
                case '5.a':
                    // Get the current possible partition
                    // for this range with assumed length
                    // of the domain and constant length
                    // m of the digits of the step... 
                    temp = (w / (lambda * (meanWidth + m))) | 0
                    // compute the real step for this 
                    // current optimal partition (temp) 
                    step = dr / temp
                    // stringify the step
                    step2str = step.toString()
                    // it is possible the step to be
                    // with smaller digits length than m
                    // so if we search m digits the tempStep
                    // will be 'undefined' so we will get only
                    // the step (with length smaller than m).
                    // We define 'p' like index, because if
                    // the step is floating point number
                    // m could be equals to the point
                    // symbol so we need the index
                    // m + 1... 
                    if (step2str.length <= m) p = step2str.length - 1
                    // NB! if you want to compute the dot symbol
                    // like 7px length symbol set:
                    //p = m // decoment this if . is 7px length
                    p = step2str.substring(0, m + 1).indexOf('.') === -1 ? m : m + 1 // coment if p = m is active
                    // get the step with m digits (p digits).
                    tempStep = parseFloat(step2str.substring(0, p + 1))
                    tempStep2str = tempStep.toString()
                    p = tempStep2str.length - 1
                    //console.log({oldTemp, temp, tempStep, oldTempStep, tempStep2str, m, p})
                    // if the previous partition is better
                    // than the current and the current 
                    // partition step is not equals to
                    // zero than set the current partition
                    // to the previous and go to 5.b
                    if (oldTemp > temp && (tempStep !== 0)) {
                        // if the previous step
                        // is not zero set the
                        // current step to the previous
                        // and make all other settings
                        if (oldTempStep !== 0) {
                            tempStep = oldTempStep
                            temp = oldTemp
                            --m
                            --p
                            status = '5.b'
                            break
                        }
                        // continue ...
                    }
                    // if the current step is
                    // zero then save the current
                    // partition and step, 
                    // increase the m and go to 5.a
                    if (tempStep === 0.0) {
                        oldTemp = temp
                        oldTempStep = tempStep
                        m += 1
                        status = '5.a'
                        break
                    }
                    // the current partition is not 
                    // optimal and distinct from 0
                    // so we continue
                    // stringify the current partition step
                    // to check if the number is floating point
                    point = tempStep2str.indexOf('.')
                    if (point === -1) residual = 10
                    else residual = Math.pow(10, point + 1 - p)
                    // it is possible to have
                    // unstable solution, so we 
                    // have to stop
                    if (tempStep2str.length === oldTempStep.toString().length && oldTempStep !== 0) {
                        tempStep = oldTempStep
                        temp = oldTemp
                        --m
                        --p
                        status = '5.b'
                        break
                    }
                    if (tempStep2str.lenght > 1) {
                        // get the latest Digit and round it!
                        lastDigit = parseInt(tempStep2str[p])
                        if (lastDigit <= 5) {
                            if (lastDigit !== 0) {
                                tempStep2str = tempStep2str.substring(0, p).concat('5')
                                tempStep = parseFloat(tempStep2str)
                            }
                        } else {
                            len = tempStep.toString().length
                            tempStep2str = tempStep.toString()
                                .substring(0, len - 1).concat('0')
                            tempStep = parseFloat(tempStep2str) + residual
                            tempStep2str = tempStep.toString()
                        }
                    } else {
                        ++tempStep
                        tempStep2str = tempStep.toString()
                    }
                    oldTemp = temp
                    oldTempStep = tempStep
                    m += 1
                    status = '5.a'
                    break
                case '5.b':
                    // compute the real partition
                    // that is dr per the current 
                    // partition (tempStep). If the real is bigger
                    // than the current then we have
                    // optimal digit partition, but 
                    // not real partition, for example
                    // if the current partition
                    // is 22 (--> the temp variable)
                    // and the current step is 4
                    // and dr = 100, then the real
                    // partition is 100 / 4 = 25, 
                    // but the width of the html
                    // element allow us to have
                    // partition of 22 points, so
                    // we have to increase the 
                    // current step. We choose
                    // to increase the the step
                    // by adding 1 to the last digit,
                    // by adding 2 to the last digit 
                    // and finaly by rounding of the last
                    // digit to 5 or 0 respectively...
                    if (dateTimeFrequency === 'yyyy') {
                        tempStep = Math.ceil(tempStep)
                    }
                    partition = dr / tempStep | 0
                    if (partition > temp) {
                        tempStep2str = tempStep.toString()
                        len = tempStep2str.length
                        lastDigit = parseInt(tempStep2str.charAt(len - 1))
                        point = tempStep2str.indexOf('.')
                        if (lastDigit < 5) tempStep2str = tempStep2str.substring(0, len - 1).concat('5')
                        else {
                            if (point === -1) residual = 10
                            else residual = Math.pow(10, 2 + point - len)
                            tempStep2str = tempStep2str.substring(0, len - 1).concat('0')
                            tempStep2str = parseFloat(tempStep2str) + residual
                        }
                        oldTempStep = tempStep
                        oldTemp = temp
                        tempStep = tempStep2str // 5
                        tempStep2str = tempStep2str.toString()
                        status = '5.b'
                        break
                    } else {
                        temp = partition
                        status = '7'
                        break
                    }
                case '6':
                    // Make the partition for
                    // date type data ...
                    // if date is monthly then 
                    // compute the maximal partition
                    dateFreqs = ['annual', 'yyyy-mm', 'yyyy-mm-dd', 'yyyy-mm-ddThh',
                        'yyyy-mm-ddThh:mm', 'yyyy-mm-ddThh:mm:ss'
                    ]
                    statuses = ['5', '6.a', '6.b', '6.c', '6.d', '6.e']
                    if (getDateFrequency(roundedRange[0]) === getDateFrequency(roundedRange[1])) {
                        j = dateFreqs.indexOf(getDateFrequency(roundedRange[0]))
                        status = statuses[j]
                        if (status === '5') typeOfRange = 'numeric'
                    } else throw new Error("Incorrect date elements.")
                    yearLen1 = new Date(roundedRange[0]).getFullYear()
                        .toString().length
                    yearLen2 = new Date(roundedRange[1]).getFullYear()
                        .toString().length
                    break
                case '6.a':
                    // data set frequency is monthly...
                    // divide the monthly interval
                    // with steps of 1, 2, 3, 4, 6, 9 and 12
                    // months. (if the dataset is monthly, we
                    // have not daily data).
                    dr = 12 * (new Date(roundedRange[1]).getFullYear()
                        - new Date(roundedRange[0]).getFullYear())
                        + new Date(roundedRange[1]).getMonth()
                        - new Date(roundedRange[0]).getMonth()
                    // here the temp is in optimal length 
                    // (~ w / 49) and is constant ...
                    temp = w / (lambda * (3 + 0.5 * (yearLen1 + yearLen2))) | 0
                    partitions = [1, 2, 3, 4, 6, 9, 12]
                        .map(el => dr / el | 0),
                        partitionCandidates = partitions
                            .filter(el => el <= temp)
                    if (partitionCandidates.constructor === Array && partitionCandidates.length === 0) {
                        roundedRange = [new Date(roundedRange[0]).getFullYear() + '',
                        new Date(roundedRange[1]).getFullYear() + ''
                        ]
                        dateTimeFrequency = 'yyyy'
                        temp = w / (lambda * (0.5 * (yearLen1 + yearLen2))) | 0
                        status = '5'
                        break
                    } else partition = Math.max(...partitionCandidates)
                    tempStep = partitions.indexOf(partition)
                    step = [1, 2, 3, 4, 6, 9, 12][tempStep]
                    tempStep = step
                    temp = partition
                    status = '7'
                    break
                case '6.b':
                    // dataset frequency is daily
                    // divide the day intervals to
                    // 1, 2, 3, 5, 7, 14, 21, 28 and
                    // go to monthly division if 
                    // is not optimal some daily division
                    dr = dateDiffDaily(roundedRange[1], roundedRange[0])
                    temp = w / (lambda * (6 + 0.5 * (yearLen1 + yearLen2)))
                    partitions = [1, 2, 3, 5, 7, 14, 21, 28]
                        .map(el => dr / el | 0),
                        partitionCandidates = partitions.filter(el => el <= temp)
                    if (partitionCandidates instanceof Array && partitionCandidates.length === 0) {
                        roundedRange[0] = formatDate(roundedRange[0], 'yyyy-mm')
                        roundedRange[1] = formatDate(roundedRange[1], 'yyyy-mm')
                        dateTimeFrequency = 'yyyy-mm'
                        status = '6.a'
                        break
                    } else partition = Math.max(...partitionCandidates)
                    tempStep = partitions.indexOf(partition)
                    step = [1, 2, 3, 5, 7, 14, 21, 28][tempStep]
                    tempStep = step
                    temp = partition
                    status = '7'
                    break
                case '6.c':
                    // dataset frequency is hourly
                    // divide the hour intervals to
                    // [1, 2, 3, 4, 6, 12] and go to
                    // daily division if any hourly
                    // division is not optimal
                    dr = dateDiffHourly(roundedRange[1], roundedRange[0])
                    temp = w / (lambda * (9 + 0.5 * (yearLen1 + yearLen2)))
                    partitions = [1, 2, 3, 4, 6, 12].map(el => dr / el | 0),
                        partitionCandidates = partitions.filter(el => el <= temp)
                    if (partitionCandidates instanceof Array && partitionCandidates.length === 0) {
                        // go to daily partition...
                        roundedRange[0] = formatDate(roundedRange[0], 'yyyy-mm-dd')
                        roundedRange[1] = formatDate(roundedRange[1], 'yyyy-mm-dd')
                        dateTimeFrequency = 'yyyy-mm-dd'
                        status = '6.b'
                        break
                    } else partition = Math.max(...partitionCandidates)
                    tempStep = partitions.indexOf(partition)
                    step = [1, 2, 3, 4, 6, 12][tempStep]
                    tempStep = step
                    temp = partition
                    status = '7'
                    break
                case '6.d':
                    // dataset frequency is
                    // minutes. Divide the
                    // minutes by 1, 2, 5, 10, 15, 20,
                    // 30, 45 and go to hourly partition
                    // if any minute partition 
                    // is not optimal
                    dr = dateDiffMinutes(roundedRange[1], roundedRange[0])
                    temp = w / (lambda * (12 + 0.5 * (yearLen1 + yearLen2)))
                    partitions = [1, 2, 5, 10, 15, 20, 30, 45].map(el => dr / el | 0)
                    partitionCandidates = partitions.filter(el => el <= temp)
                    if (partitionCandidates instanceof Array && partitionCandidates.length === 0) {
                        // go to hourly partition:
                        roundedRange[0] = formatDate(roundedRange[0], 'yyyy-mm-ddThh')
                        roundedRange[1] = formatDate(roundedRange[1], 'yyyy-mm-ddThh')
                        dateTimeFrequency = 'yyyy-mm-ddThh'
                        status = '6.c'
                        break
                    } else partition = Math.max(...partitionCandidates)
                    tempStep = partitions.indexOf(partition)
                    step = [1, 2, 5, 10, 15, 20, 30, 45][tempStep]
                    tempStep = step
                    temp = partition
                    status = '7'
                    break
                case '6.e':
                    // dataset frequency is 
                    // secondary. Divide the
                    // secondary intervals to
                    // 1, 2, 5, 10, 15, 20, 30, 45
                    // and go to minute partition
                    // if any secondary partition 
                    // is not optimal
                    dr = dateDiffInSeconds(roundedRange[1], roundedRange[0])
                    temp = w / (lambda * (15 + 0.5 * (yearLen1 + yearLen2)))
                    partitions = [1, 2, 5, 10, 15, 20, 30, 45].map(el => dr / el | 0)
                    partitionCandidates = partitions.filter(el => el <= temp)
                    if (partitionCandidates instanceof Array && partitionCandidates.length === 0) {
                        // go to minute patrition
                        roundedRange[0] = formatDate(roundedRange[0], 'yyyy-mm-ddThh:mm')
                        roundedRange[1] = formatDate(roundedRange[1], 'yyyy-mm-ddThh:mm')
                        dateTimeFrequency = 'yyyy-mm-ddThh:mm'
                        status = '6.d'
                        break
                    } else partition = Math.max(...partitionCandidates)
                    tempStep = partitions.indexOf(partition)
                    step = [1, 2, 5, 10, 15, 20, 30, 45][tempStep]
                    tempStep = step
                    temp = partition
                    status = '7'
                    break
                case '7':
                    // create the list with
                    // linear space of the range
                    // and of the domain (for the
                    // ticks in the graphic).
                    if (typeOfRange === 'numeric') {
                        for (i = 0; i < temp; i++) {
                            listRange.push(+roundedRange[0] + i * tempStep)
                            listDomain.push((w * (listRange[i] - roundedRange[0]) / dr) + domain[0])
                        }
                        listRange = listRange
                        listDomain = listDomain
                        status = '8'
                        break
                    }
                    // the type is dateTime type ...
                    const computeDate = (i, freq) => {
                        let index = freq.split('-').length - 1
                        if (index > 2) {
                            if (freq[index].indexOf('T') !== -1) {
                                index += freq[index].split(':').lenght - 1
                            }
                        }
                        let currentDateArgs = Array
                            .from({ length: dateArgs.length })
                            .map((elem, ind) => {
                                elem = dateArgs[ind]
                                if (ind === index) elem += i * tempStep
                                return elem
                            })
                        return formatDate(new Date(...currentDateArgs), freq)
                    }
                    let l = Date.parse(roundedRange[1]) - Date.parse(roundedRange[0]),
                        dt0 = new Date(roundedRange[0]), year = dt0.getFullYear(),
                        month = dt0.getMonth(), date0 = dt0.getDate(), hour = dt0.getHours(),
                        minutes = dt0.getMinutes(), seconds = dt0.getSeconds(),
                        dateArgs = [year, month, date0, hour, minutes, seconds]
                    for (i = 0; i < temp; i++) {
                        listRange.push(computeDate(i, dateTimeFrequency))
                        let proportion = (Date.parse(listRange[i]) - Date.parse(roundedRange[0])) / l
                        listDomain.push(domain[0] + (proportion * w))
                    }
                    status = '8'
                    break
                case '8':
                    // it is possible the optimal
                    // partitions to be very compact
                    // so when we plot the x axis
                    // it will be very complete and 
                    // so we have to ensure that the 
                    // x axis will be not complete
                    // increasing the lambda parameter                    
                    // by one and returning to step 3...
                    // create the distance metric
                    // μ = min{dlistDomain[i] / (lambda * len(listRange[i]))}
                    // if μ < ε, then set lambda += 1 and go to step 3.
                    mju = Math.min(...Array
                        .from({ length: listRange.length })
                        .map((element, i) => {
                            let lenListRangei = listRange[i].toString().length,
                                dlistDomaini
                            if (i === listRange.length - 1) {
                                if (domain[1] - listDomain[i] === 0) dlistDomaini = 10
                                else dlistDomaini = domain[1] - listDomain[i]
                            } else dlistDomaini = listDomain[i + 1] - listDomain[i]
                            element = dlistDomaini - (7 * lenListRangei)
                            return element
                        }))
                    if (mju < epsilon) {
                        ++lambda
                        listRange = []
                        listDomain = []
                        status = '3'
                    } else status = 0
                    break
            }
        }
        return {
            listRange, listDomain, partitions: temp, distance: mju,
            step: tempStep + (dateTimeFrequency !== null ?
                dateTimeFrequency === 'yyyy' ? ' years' :
                    dateTimeFrequency === 'yyyy-mm' ? ' months' :
                        dateTimeFrequency === 'yyyy-mm-dd' ? ' days' :
                            dateTimeFrequency === 'yyyy-mm-ddThh' ? ' hours' :
                                dateTimeFrequency === 'yyyy-mm-ddThh:mm' ? ' minutes' :
                                    dateTimeFrequency === 'yyyy-mm-ddThh:mm:ss' ? ' seconds' : '' : '')
        }
    }
    let domain = params.domain || [+this.getCss('marginLeft').split('px')[0],
    +(this).property('width') - this.getCss('marginRight').split('px')[0]],
        range = params.range,
        color = params.color || 'black',
        width = params['line width'] || 1,
        type = params.type || 'numeric',
        //interval = params.intervals,
        position = params.position || 'bottom',
        x1, y1, rangeList, domainList, apxar
    /**
     * Check for errors: 
    */
    if (typeof range === 'undefined') {
        throw new Error("The range is not defined.")
    } else if (!range instanceof Array) {
        throw new Error('The range have to be of type Array.')
    } else {
        if (range.length !== 2) throw new Error("The range property have to be an array with two elements.")
        else {
            if (type === 'numeric') {
                if (range.some(el => { return el instanceof String && !isNaN(Number(el)) })) {
                    range = range.map(el => { return el = Number(el) })
                } else if (!range.every(el => { return !isNaN(el) })) throw new Error("Some element of the range is NaN.")
            }
        }
    }
    apxar = APXAR(range, domain, type)
    rangeList = apxar.listRange
    domainList = apxar.listDomain
    let roundedRange = apxar.roundedRange
    if (position === "bottom") {
        y1 = this.property("height") - this.getCss("marginTop").split("px")[0] - this.getCss("marginBottom").split("px")[0]
    } else if (position === "top") {
        y1 = this.getCss("marginTop").split("px")[0]
    }
    this.append("path")
        .attr({
            "d": "M " + domain[0] + " " + y1 + " q 0 0 2 " + (position === "bottom" ? -8 : 8) +
                " l " + (domain[1] - domain[0] - 1) + " "
                + "0" + " q 0 0 2 " + (position === "bottom" ? 8 : -8),
            "stroke": color,
            "fill": "none",
            "stroke-width": (width)
        })
    let scaleLines = this.append("g").attr({ "class": "abcisa" }),
        scaleTexts = scaleLines.attr({ "font-size": 10 });
    for (let i = 0; i < rangeList.length; i++) {
        let x = domainList[i]
        scaleLines.append("line")
            .attr({
                "x1": x,
                "x2": x,
                "y1": y1 - 7,
                "y2": y1 + 3,
                "stroke": color,
                "stroke-width": (width),
                "fill": "none"
            })
        scaleTexts
            .append("text")
            .attr({
                "x": x,
                "y": y1,
                "dy": 10,
                "dx": -5
            })
            .text(rangeList[i]);
    }
    return this;
}
euriklis.html.prototype.add2DAxisX = function (characteristics) {
    "use strict"
    let domain = characteristics.domain || [+this.getCss("marginLeft").split("px")[0], +(this.property("width") - this.getCss("marginRight").split("px")[0])],
        range = characteristics.range,
        color = characteristics.color || "black",
        width = characteristics.width || 1,
        type = characteristics.type || 'numeric',
        intervals = characteristics.intervals || 10,
        position = characteristics.position || "bottom", y1, y2;
    if (!range) throw new Error("Inside the range variable!!!");
    if (position === "bottom") {
        y1 = this.property("height") - this.getCss("marginTop").split("px")[0] - this.getCss("marginBottom").split("px")[0];
        y2 = y1;
    } else if (position === "top") {
        y1 = this.getCss("marginTop").split("px")[0];
        y2 = y1;
    }
    this.append("path")
        .attr({
            "d": "M " + domain[0] + " " + y1 + " q 0 0 2 " + (position === "bottom" ? -8 : 8) +
                " l " + (domain[1] - domain[0] - 1) + " "
                + "0" + " q 0 0 2 " + (position === "bottom" ? 8 : -8),
            "stroke": color,
            "fill": "none",
            "stroke-width": (width)
        })
    /**
     * create the partition of the data:
    */
    /**
     * 1.stringify the range: 
    */
    let strRnge = [range[0].toString(), range[1].toString()];
    /**
     * 2.get the dimension of the range digits:
    */
    let dimRange = [strRnge[0].length, strRnge[1].length];
    //3.get the differential of the domain:
    let diffDomain = domain[1] - domain[0];
    /**
     * 2a.Check if the data is numeric
     * ot date type...
    */
    let types = [["numeric"], ["date", "datetime", "date time"]]
    const isLegalType = types.some(t1 => {
        return t1.some(t2 => {
            return t2.toLowerCase() === type;
        })
    })
    if (!isLegalType) throw new Error('Illegal type of the data of the x axis. The data can be only numeric or date.')
    types.forEach((t1, i) => {
        if (i === 0) {
            if (t1.some(t2 => {
                return t2.toLowerCase() === type;
            })) type = 'numeric'
            else type = 'date'
        }
    })
    /** 
     * we assume that every symbol has 
     * length of 7 px so the delta of 
     * the e-neighbourght is 7 * lmax
     * where the the lmax is the maximum string
     * length of the range. For example 
     * if the range is :
     * [0.234, 4.27987665] then the lmax will
     * be 10 and the delta (the length of the 
     * e-eighborght) is 7 * 10 = 70px.  
     */
    let lmax = Math.max.apply(null, dimRange),
        delta = 7 * lmax;
    /**
     * 4. make the partition :  
     * partition = ceil(diffDomain / delta)
     */
    let partition = (diffDomain / delta) | 0;
    /** 
     * 5. set interval to 10 and
     * check if scale with interval 10
     * is possible for this domain...
     */
    let tempIntervals = intervals;
    do {
        if (((range[1] - range[0]) / tempIntervals | 0) > partition) {
            tempIntervals += intervals;
        } else {
            intervals = tempIntervals;
            break;
        };
    } while (1);
    let tempPartition = (range[1] - range[0]) / intervals | 0,
        rangePartition = (range[1] - range[0]) / intervals | 0,
        linspace = [],
        linspaceDomain = [];
    while (tempPartition) {
        --tempPartition;
        linspace.push((range[0] | 0) + (rangePartition - tempPartition) * intervals);
        linspaceDomain.push(domain[0] + diffDomain * ((linspace[linspace.length - 1] - range[0]) / (range[1] - range[0])))
    }
    /** 
     * 6. add line elements
     * with coordinates the 
     * linspaceDomain slements
     * and text attributes to them
     * the linspace elements ...
     */
    let scaleLines = this.append("g").attr({ "class": "abcisa" }),
        scaleTexts = scaleLines.attr({ "font-size": 10 });
    for (let i = 0; i < linspace.length; i++) {
        let x = linspaceDomain[i]
        scaleLines.append("line")
            .attr({
                "x1": x,
                "x2": x,
                "y1": y1 - 7,
                "y2": y1 + 3,
                "stroke": "black",
                "stroke-width": (width),
                "fill": "none"
            })
        scaleTexts
            .append("text")
            .attr({
                "x": x,
                "y": y1,
                "dy": 10,
                "dx": -5
            })
            .text(linspace[i]);

    }
    return this;
}
euriklis.html.prototype.add2DAxisY = function (characteristics) {
    "use strict"
    let domain = characteristics.domain || [+this.getCss("marginTop").split("px")[0], +(this.property("height") - this.getCss("marginBottom").split("px")[0])],
        range = characteristics.range,
        color = characteristics.color || "black",
        width = characteristics.width || 1,
        dotted = characteristics.dotted || false,
        intervals = characteristics.intervals || 10,
        position = characteristics.position || "left", y1, y2;
    if (!range) throw new Error("Inside the range variable!!!");
    if (position === "right") {
        y1 = this.property("width") - this.getCss("marginRight").split("px")[0];
        y2 = y1;
    } else if (position === "left") {
        y1 = this.getCss("marginLeft").split("px")[0];
        y2 = y1;
    }
    this.append("path")
        .attr({
            /** 
             * go to the upper position...
            */
            "d": "M " + (+y1 + (position === "left" ? -8 : 8)) + " " + domain[0] + " q 0 0 " + (position === "left" ? 8 : -8) + " 2" +
                " l " + "0 "
                + (domain[1] - domain[0] - this.getCss("marginTop").split("px")[0] - this.getCss("marginBottom").split("px")[0] - 10)
                + " q 0 0 " + (position === "left" ? -8 : 8) + " 2",
            "stroke": color,
            "fill": "none",
            "stroke-width": (width)
        })
    /** 
     * See the comentaries for the 
     * function add2DAxisY for more
     * information how it works...
    */
    let strRnge = [range[0].toString(), range[1].toString()],
        dimRange = [strRnge[0].length, strRnge[1].length],
        diffDomain = domain[1] - domain[0],
        lmax = Math.max.apply(null, dimRange),
        delta = 7 * lmax,
        partition = (diffDomain / delta) | 0,
        tempIntervals = intervals, tempPartition, rangePartition,
        linspace = [], linspaceDomain = [];
    do {
        if (((range[1] - range[0]) / tempIntervals | 0) > partition) {
            tempIntervals += intervals;
        } else {
            intervals = tempIntervals;
            break;
        };
    } while (1);
    tempPartition = (range[1] - range[0]) / intervals | 0,
        rangePartition = (range[1] - range[0]) / intervals | 0;
    while (tempPartition) {
        --tempPartition;
        linspace.push((range[0] | 0) + (rangePartition - tempPartition) * intervals);
        linspaceDomain.push(domain[1] - diffDomain * ((linspace[linspace.length - 1] - range[0]) / (range[1] - range[0])))
    }
    let scaleLines = this.append("g").attr({ "class": "ordinata" }),
        scaleTexts = scaleLines.attr({ "font-size": 10 });
    for (let i = 0; i < linspace.length; i++) {
        let x = linspaceDomain[i]
        scaleLines.append("line")
            .attr({
                "x1": y1 - 7,
                "x2": +y1 + 1,
                "y1": x,
                "y2": x,
                "stroke": "black",
                "stroke-width": (width),
                "fill": "none"
            })
        scaleTexts
            .append("text")
            .attr({
                "x": y1,
                "y": x,
                "dy": 2,
                "dx": -25
            })
            .text(linspace[i]);
    }
    return this;
}
