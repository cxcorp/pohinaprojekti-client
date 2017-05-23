import * as React from 'react';
import * as urljoin from 'url-join';
import { Process } from '../model';

const API_BASE = process.env.API_BASE || '/api';
const PROCESS_ENDPOINT = urljoin(API_BASE, '/processes');
const UPDATE_DELAY = 500;

type Props = {};
type State = {
    processes: Process[]
};

export class ProcessListContainer extends React.Component<Props, State> {
    private timeoutId: number = -1;

    constructor(props: Props) {
        super(props);
        this.state = {
            processes: []
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        const doUpdate = (() => {
            this.update().then(() => {
                this.timeoutId = setTimeout(doUpdate, UPDATE_DELAY);
            });
        }).bind(this);
        doUpdate();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render() {
        return (
            <ProcessList processes={this.state.processes} />
        );
    }

    private update() {
        const init = {
            method: 'GET',
            headers: {
                'Connection': 'keep-alive',
                'Accept': 'application/json'
            }
        };

        return fetch(PROCESS_ENDPOINT, init)
            .then(data => data.json())
            .then(response => {
                this.setState({ processes: response.result });
            });
    }
}

type ProcessListProps = {
    processes: Process[]
};

function ProcessList({ processes }: ProcessListProps) {
    const rows = processes.map(p => (
        <ProcessListTableRow process={p} key={p.pid} />
    ));
    return (
        <table className="table">
            <thead>
                <tr>
                    <th><abbr title="Process Identifier">PID</abbr></th>
                    <th>Command</th>
                    <th>CPU %</th>
                    <th>Memory %</th>
                    <th>Owner</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

type ProcessListTableRowProps = { process: Process };

function ProcessListTableRow({ process }: ProcessListTableRowProps) {
    return (
        <tr>
            <th>{process.pid}</th>
            <td><code>{process.command}</code></td>
            <td>{process.cpu}</td>
            <td>{process.mem}</td>
            <td>{process.user}</td>
        </tr>
    );
}