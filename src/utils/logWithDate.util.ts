export function logWithDate(str: string) {
  const dateSring = new Date().toLocaleString();
  console.log(`${dateSring}: ${str}`);
}
