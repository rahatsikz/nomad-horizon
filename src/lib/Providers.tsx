"use client";
import { persistor, store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          position='top-center'
          containerStyle={{ top: 88 }}
          toastOptions={{
            className: "font-text",
            style: {
              background: "rgb(var(--nh-raised))",
              color: "rgb(var(--nh-fg))",
              border: "1px solid rgb(var(--nh-fg) / 0.12)",
              borderRadius: "14px",
              fontSize: "14px",
              boxShadow: "0 24px 48px -24px rgb(0 0 0 / 0.6)",
            },
            success: { iconTheme: { primary: "rgb(var(--nh-amber))", secondary: "rgb(var(--nh-on-amber))" } },
            error: { iconTheme: { primary: "rgb(var(--nh-danger))", secondary: "rgb(var(--nh-on-danger))" } },
          }}
        />
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
