"use client";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { store, useAppDispatch } from "@redux/store";
import { useEffect } from "react";

const AuthProviders = (props) => {
  const session = useSession();
  const dispatch = useAppDispatch()

  useEffect(() => {
      const { status, data } = session;

      if (status === "authenticated" && data?.user?.email) {
          dispatch(userData(data.user));
      }

  }, [session]);
  
  return (
    <Provider store={store}>
      <SessionProvider session={props.session}>
        {props.children}
      </SessionProvider>
    </Provider>
  );
};

export default AuthProviders;