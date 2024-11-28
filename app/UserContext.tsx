import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface UserContextType {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props for the UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// Create the provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
