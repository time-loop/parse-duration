"use strict";

var duration = /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-zμ]*)/gi;

module.exports = parse;

/**
 * conversion ratios
 */

parse.nanosecond = parse.ns = 1 / 1e6;

parse.μs = parse.microsecond = 1 / 1e3;

parse.millisecond = parse.ms = 1;

parse.second = parse.sec = parse.s = parse.ms * 1000;

parse.minute = parse.min = parse.m = parse.s * 60;

parse.hour = parse.hr = parse.h = parse.m * 60;

parse.day = parse.d = parse.h * 24;

parse.week = parse.wk = parse.w = parse.d * 7;

parse.b = parse.month = parse.d * (365.25 / 12);

parse.year = parse.yr = parse.y = parse.d * 365.25;

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} defaultUnits
 * @return {Number}
 */

function parse(str, defaultUnits) {
    defaultUnits = defaultUnits || "ms";
    var result = 0;
    str.replace(duration, function(_, n, units) {
        units =
            parse[units] ||
            parse[units.toLowerCase().replace(/s$/, "")] ||
            parse[defaultUnits.toLowerCase().replace(/s$/, "")];
        result += parseFloat(n, 10) * units;
    });
    return result;
}
