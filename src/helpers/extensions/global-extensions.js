import isEmpty from "lodash/isEmpty";
import {isTruthy,isFalsy} from "helpers/is-truthy";

globalThis.isEmpty = isEmpty;
globalThis.isTruthy = isTruthy;
globalThis.isFalsy = isFalsy;

