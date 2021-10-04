export default async function delay(delayInMs = 5000) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, delayInMs);
  });
}
