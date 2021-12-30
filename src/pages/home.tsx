import { AppProps } from 'next/app';
import '@/styles/global.css';

export default function Trivia({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
