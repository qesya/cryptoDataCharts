import React, { Component } from 'react';
import rp from 'request-promise';
import moment from 'moment';
import './App.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null,
      token: this.props.token
    }
  }
  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }

  componentDidMount(){
    const getData = async () => {
      const historicalPrices = {
        uri: `https://api.tokenanalyst.io/analytics/last?job=${this.state.token}_volume_30day_v5&format=json`,
        json: true
      }
      try {
        const bitcoinData = await rp(historicalPrices);
        const SortbitcoinData = bitcoinData.sort(function(a, b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      //  console.log(bitcoinData)
        console.log();
        const sortedData = [];
       // let count = 0;
        for(let i=0;i<30;i++){
          sortedData.push({
            d: moment(SortbitcoinData[i].date).format('MMM DD'),
            p: SortbitcoinData[i].price_usd.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            x: i, //previous days
            y: SortbitcoinData[i].price_usd // numerical price
          });
        }
        this.setState({
          data: sortedData,
          fetchingData: false
        })

       // console.log(this.state.data)
        // console.log('sorted')

      }
      catch(e){
        console.log(e);
      }
    }
    getData();
  }
  render() {
    return (

      <div className='container'>
        <div className='row'>
          <h1>30 Day Price Chart</h1>
        </div>

        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className='row'>
          <div className='chart'>
            { !this.state.fetchingData ?
              <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
              : null }
          </div>
        </div>
      </div>

    );
  }
}

export default App;
