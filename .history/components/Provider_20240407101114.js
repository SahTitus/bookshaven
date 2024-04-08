"use client";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@redux/store";

const AuthProviders = (props) => {
  const session = useSession();
  const dispatch = useAppDispatch()

  useEffect(() => {
      const { status, data } = session;

      if (status === "authenticated" && data?.user?.email) {
          dispatch(userData(data.user));
      }

      // if (status != 'loading' && status === "unauthenticated" && !showAuthForm) {
      //     const timeoutId = setTimeout(() => {
      //         setShowAuthForm(true);
      //     }, 5000);

      //     // Cleanup the timeout to avoid memory leaks
      //     return () => clearTimeout(timeoutId);
      // };
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