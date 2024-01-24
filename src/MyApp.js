import {useRoutes} from "react-router-dom";
import {routes} from "./routes";
import './MyApp.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import {message,App} from "antd";

function MyApp() {
    const element = useRoutes(routes)
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <Provider store={store} className="App">
            <App>
                {contextHolder}
                {element}
            </App>
        </Provider>
    );
}

export default MyApp;
