import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { ILoan } from '../interfaces/ILoan';
import { LoanRow } from './LoanRow';
import { Api } from '../api/Api';
import { Helpers } from '../api/Helpers';

interface Props {
}

interface State {
    helpers: Helpers;
    api: Api;
    loans: Array<ILoan>;
    totalDailyCost: Array<number>;
    partialDailyCost: Array<number>;
}

// Shows account details for a logged in user
export class LoanSummary extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            helpers: new Helpers(),
            api: new Api(),
            loans: [],
            totalDailyCost: [],
            partialDailyCost: []
        };

        this.updateCostFunc = this.updateCostFunc.bind(this);
    }

    updateCostFunc(partial: number, total: number) {
        var partialArray = this.state.partialDailyCost;
        partialArray.push(partial);

        var totalArray = this.state.totalDailyCost;
        totalArray.push(total);

        this.setState({
            totalDailyCost: totalArray,
            partialDailyCost: partialArray
        });
    }

    // Lifecycle
    componentWillMount() {
        this.state.api.getLoans()
            .then(result => {
                this.setState({
                    loans: result.data as Array<ILoan>
                });
            });
    }

    public render() {
        // Render each loan
        const loansJSX = this.state.loans.map(loan => (
            <LoanRow loan={loan} linkTo={'/loans/' + loan.id} updateFunc={this.updateCostFunc}/>
        ));

        return (
            <div id='user-details'>
                <div className='row h-100'>
                    <div className='col'>
                        <div className='bd-lead'>
                            <div className='d-inline-flex bd-highlight px-2'>
                                You have paid 
                            </div>
                            <div className='d-inline-flex bd-highlight text-success'>
                                {this.state.helpers.formatCurrency(this.state.partialDailyCost.reduce((a, b) => { return a + b }, 0))} 
                            </div>
                            <div className='d-inline-flex bd-highlight px-2'>
                                out of
                            </div>
                            <div className='d-inline-flex bd-highlight'>
                                {this.state.helpers.formatCurrency(this.state.totalDailyCost.reduce((a, b) => { return a + b }, 0))}
                            </div>
                            <div className='d-inline-flex bd-highlight px-2'>
                                today
                            </div>
                        </div>

                        {this.state.loans ? loansJSX : "No Data"}
                    </div>
                </div>
            </div>
        );
    }
}
