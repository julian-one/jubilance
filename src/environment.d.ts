declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEPLOYMENT_ENV: string;
            DOMAIN_NAME: string;
            DOMAIN_NAME_ALIAS_HOSTED_ZONE_ID: string;
            DOMAIN_NAME_ALIAS_TARGET: string;
        }
    }
}

export {};
