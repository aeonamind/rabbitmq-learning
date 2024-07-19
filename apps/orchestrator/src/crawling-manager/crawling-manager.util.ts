import { ICrawlingRequestMessage } from './interfaces';

export const splitRange = (
  start: number,
  end: number,
  numberOfChunks: number,
) => {
  const result: ICrawlingRequestMessage[] = [];

  const chunkSize = Math.ceil((end - start + 1) / numberOfChunks);

  for (let i = 0; i < numberOfChunks; i++) {
    const chunkStart = start + i * chunkSize;
    const chunkEnd = Math.min(chunkStart + chunkSize - 1, end);
    result.push({ label: `job:${end}`, start: chunkStart, end: chunkEnd });
  }

  return result;
};
