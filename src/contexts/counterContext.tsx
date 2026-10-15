import { createContext, useState, type ReactElement } from "react";

export const counterContext = createContext<any>({});

export default function CounterContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [count, setCount] = useState(0);
  return (
    <counterContext.Provider value={{ count, setCount }}>
      {children}
    </counterContext.Provider>
  );
}
