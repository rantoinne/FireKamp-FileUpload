export default async function delay(delayInMs = 8000) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, delayInMs);
  });
}
