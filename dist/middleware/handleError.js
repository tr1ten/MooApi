"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const error_1 = require("../error");
function apiErrorHandler(err, req, res, next) {
    // in prod, don't use console.log or console.err because
    // it is not async
    console.error("new error ", err);
    if (err instanceof error_1.ApiError) {
        res.status(err.code).json(err.message);
        return;
    }
    res.status(500).json('something went wrong');
}
exports.apiErrorHandler = apiErrorHandler;
