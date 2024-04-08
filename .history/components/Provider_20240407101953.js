"use client";
import { Provider } from "react-redux";
import { SessionProvider,  } from "next-auth/react";
import { store, useAppDispatch } from "@redux/store";
import { useEffect } from "react";

const AuthProviders = (props) => {

  return (
    <Provider store={store}>
      <SessionProvider session={props.session}>
        {props.children}
      </SessionProvider>
    </Provider>
  );
};

export default AuthProviders;