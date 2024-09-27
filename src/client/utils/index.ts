import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { z, ZodTypeAny } from 'zod';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const IsSSR = () => typeof window === 'undefined';

// export const numericString = (schema: ZodTypeAny) =>
//   z.preprocess((a) => {
//     if (typeof a === 'string') {
//       return parseInt(a, 10);
//     } else if (typeof a === 'number') {
//       return a;
//     } else {
//       return undefined;
//     }
//   }, schema);

export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];

  const i = Math.ceil(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
