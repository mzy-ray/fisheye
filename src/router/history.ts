import {createBrowserHistory, History} from 'history';

// subpath of the web service
const defaultPath: string = process.env.PUBLIC_URL;

const history: History = createBrowserHistory({basename: defaultPath});

export default history;
