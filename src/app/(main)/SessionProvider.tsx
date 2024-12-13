import React from 'react';
import { validateRequest } from '@/app/auth';
import { User, Session } from 'lucia';
import { cookies } from 'next/headers';

interface SessionContextType {
  user: User | null;
  session: Session | null;
  userCount: number;
}

const fetchSessionData = async (): Promise<SessionContextType> => {
  const result = await validateRequest();

  // Fetch user count
  const response = await fetch('http://localhost:3000/api/user-count', {
    headers: {
      'Authorization': `Bearer ${(await cookies()).get('sessionId')?.value}`,
    },
  });
  const data = await response.json();
  
  return {
    ...result,
    userCount: data.count,
  };
};

const SessionProvider: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const sessionContextValue = await fetchSessionData();

  return (
    <React.Fragment>
      {React.cloneElement(children as React.ReactElement<any>, { sessionContextValue })}
    </React.Fragment>
  );
};

export default SessionProvider;
