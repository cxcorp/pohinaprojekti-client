import * as React from 'react';
import * as urljoin from 'url-join';
import { Process } from '../model';

const API_BASE = process.env.API_BASE || '/api';
const PROCESS_ENDPOINT = urljoin(API_BASE, '/processes');

type Props = {};
type State = {
    processes: Process[],
};

export class ProcessListContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            processes: []
        };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
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

        fetch(PROCESS_ENDPOINT, init)
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
                <th><abbr title="Process Identifier">PID</abbr></th>
                <th>Command</th>
                <th>CPU %</th>
                <th>Memory %</th>
                <th>Owner</th>
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