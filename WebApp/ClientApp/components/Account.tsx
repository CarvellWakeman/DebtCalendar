import * as React from 'react';
import { IAccount } from '../interfaces/IAccount';
import { NavLink } from 'react-router-dom';

interface Props {
    account: IAccount;
    linkTo: string;
}

// Shows information for a single account, links to detailed view of account
export class Account extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public render() {
        return <NavLink to={this.props.linkTo} exact activeClassName='active' className='list-group-item list-group-item-action'>
            <div className='row'>
                <div className='col-sm'>
                    {this.props.account.accountType}
                </div>
                <div className='col-sm text-right font-weight-bold'>
                    ${Math.round(this.props.account.balance * 100) / 100}
                </div>
            </div>
        </NavLink>
    }
}
