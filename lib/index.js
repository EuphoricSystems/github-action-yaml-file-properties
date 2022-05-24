"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const js_yaml_1 = require("js-yaml");
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const file_path = core.getInput("file_path");
        const prop_path = core.getInput("prop_path");
        let pathArr = [];
        if (prop_path) {
            pathArr = prop_path.split(".");
        }
        try {
            const buffer = yield readFileAsync(file_path);
            let json = (0, js_yaml_1.load)(buffer.toString());
            if (pathArr.length > 0) {
                json = pathArr.reduce((obj, key) => key && obj && obj[key] !== "undefined" ? obj[key] : undefined, json);
            }
            if (json && typeof json === "object") {
                for (const key in json) {
                    core.setOutput(key, json[key]);
                }
            }
            else if (json) {
                core.setOutput("value", json);
            }
            else {
                core.setFailed(`can not find prop_path: ${prop_path} in json file.`);
            }
        }
        catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    });
}
run();
