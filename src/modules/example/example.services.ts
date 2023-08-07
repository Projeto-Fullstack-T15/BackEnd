export async function getHelloService(): Promise<string> {
    const randomTime = Math.random() * 1000;

    const promiseHelloWorld = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World!");
        }, randomTime);
    });

    return await promiseHelloWorld;
} 