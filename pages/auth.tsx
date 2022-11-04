import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = () => {
    const { data: session, status } = useSession();
    useEffect(() => {
        // if (!(status === "loading") && !session) void signIn("google");
        if (!(status === "loading") && !session) void signIn();
        if (session) window.close();
    }, [session, status]);
    return <div className="w-full h-full absolute left-0 right-0 bg-white"></div>
};

export default  Auth;