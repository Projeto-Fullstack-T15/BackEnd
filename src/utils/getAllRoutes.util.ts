import { Router } from "express";

export function getAllEndpoints(router: Router, path?: string) {
    const endpoints: Array<string> = [];
    router.stack.forEach(layer => {
        if (layer.route) {

            const subPath = layer.route.path;
            const methods = Object.keys(layer.route.methods);

            methods.forEach((method) => {
                endpoints.push(`${method.toUpperCase()} ${path}${subPath}`);
            });
        }
    });

    return endpoints;
}