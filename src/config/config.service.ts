import {Inject, Injectable} from "@nestjs/common";
import {EnvConfig} from "./config.interfaces";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Path from "path";

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(@Inject('CONFIG_OPTIONS') private options) {
        // const options = {folder: './config'}
        const filePath = `${process.env.NODE_ENV || 'dev'}.env.js`
        const envFile = Path.resolve(__dirname, '../../', options.folder, filePath)
        this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }

    get(key: string): string {
        console.log('envConfig:', this.envConfig)
        return this.envConfig[key]
    }

}