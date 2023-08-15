import { Router } from "express";

export function getAllEndpoints(router: Router, path?: string) {
  const endpoints: Array<string> = [];

  if (router && router.stack) {
    // Verificação para evitar erro
    router.stack.forEach((layer) => {
      if (layer.route) {
        const subPath = layer.route.path;
        const methods = Object.keys(layer.route.methods);

        methods.forEach((method) => {
          endpoints.push(`${method.toUpperCase()} ${path}${subPath}`);
        });
      }
    });
  } else {
    console.error("Router or router.stack is undefined or not valid.");
  }

  return endpoints;
}
