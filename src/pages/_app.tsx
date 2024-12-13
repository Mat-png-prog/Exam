import '../app/globals.css';
import type { AppProps } from 'next/app';
import { User, Session } from 'lucia';

interface SessionContextType {
  user: User | null;
  session: Session | null;
  userCount: number;
}

function MyApp({ Component, pageProps, sessionContextValue }: AppProps & { sessionContextValue: SessionContextType }) {
  return (
    <Component {...pageProps} sessionContextValue={sessionContextValue} />
  );
}

export default MyApp;

