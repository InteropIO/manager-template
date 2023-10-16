import AdminUI from "@glue42/server-admin-ui";
import { NoneAuthProvider } from "@glue42/server-admin-ui";
import { useState } from "react";
import { AutoLogin } from "./autoLogin";

const App = () => {
    const [options, setOptions] = useState<any | undefined>(undefined);
    const [_, setChange] = useState(new Date());
    const [provider, __] = useState(new NoneAuthProvider(setChange, () => setOptions(undefined)));

    if (!options) {
        return (
            <AutoLogin url="/server" success={setOptions} />
        );
    }
    provider.setOptions(options);

    return (
        <AdminUI
            baseName={process.env.PUBLIC_URL}
            apiURL="/server"
            theme="dark"
            auth={provider}
        />
    )
};

export default App;