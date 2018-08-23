
declare module 'connect-static-file' {
    import {Handler} from 'express'
    import {SendOptions} from 'send'
    
    interface Options extends SendOptions {
        encoded?: string;
        headers?: {[key: string]: string};
    }
    
    function connectStaticFile(path: string, options?: Options): Handler;
    
    namespace connectStaticFile {
        export type StaticFileOptions = Options;
    }
    export = connectStaticFile;
}
