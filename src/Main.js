import './styles/Main.css';
import Filters from './components/filters';
import DataVisualization from './DataVisualization'
import Sidebar from './components/sidebar';
import { useContextProvider } from './context/context';

export const getUniqueEl = (data, key) => {
    const all = data.flatMap(item => item[key]);
    return [...new Set(all)];
};

function Main() {
    const { currentProtocolVisualization, jsonResponse } = useContextProvider();

    return (
        <div className="main card">
            <Filters />
            <div className="container ">
                <Sidebar />
                <div className="main--api">
                    <DataVisualization protocol={currentProtocolVisualization} jsonResponse={jsonResponse} />
                </div>
            </div>
        </div>
    );
}

export default Main;
