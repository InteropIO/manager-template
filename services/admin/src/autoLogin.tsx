import { Options } from "@glue42/server-api";
import { ClientAPI } from "@glue42/server-api/dist/client";
import { useEffect, useState } from "react";

export function AutoLogin(props: { url: string, success: (options: Options) => void }) {
    const [error, setError] = useState<string>();
    //
    const isLoginOnlyPage = document.location.href.endsWith(`/gd`) || document.location.href.endsWith(`?gd`);
    const isRunningInGD = !!(window as any).glue42gd;

    console.log(`isLoginOnlyPage=${isLoginOnlyPage} isRunningInGD=${isRunningInGD}`);

    useEffect(() => {

        if (!isRunningInGD) {
            setError("you should open this page in GD");
            return;
        }

        const getUserData = async () => {

            const user = ((window as any).glue42gd as any).user;
            const options = {
                baseUrl: props.url,
                auth: {
                    username: user
                },
            };
            const clientApi = new ClientAPI(options);

            try {
                await clientApi.whoAmI();
                if (isLoginOnlyPage) {
                    await ((window as any).glue42gd as any).authDone({
                        user,
                        headers: {
                            "user": user
                        }
                    });
                } else {
                    props.success(options)
                }
            } catch (e: any) {
                // TODO *mark error
                console.error(e);
                setError("Error authenticating user - " + e.message);
            }
        }
        getUserData();
    });

    return (
        <div className="container-fluid h-100 d-flex flex-column">
            {isRunningInGD ? "Authenticating..." : "Please open this page in io.Connect Desktop"}
        </div>
    );
}