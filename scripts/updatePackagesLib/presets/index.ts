import { react } from "./react";
import { babel } from "./babel";
import { awsSdk } from "./awsSdk";
import { jest } from "./jest";

export const presets = [react, babel, awsSdk, jest];
