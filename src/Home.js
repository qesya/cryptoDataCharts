import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import LineChart from './Components/LineChart/LineChart'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      TokenList: [],
      HistoryList: [],
      ChartDataBNB: [],
      ChartDataBAT: [],
      ChartDataGNT: [],
      ChartDataMKR: [],
      ChartDataOMG: [],
      ChartDataREP: [],
      ChartDataZIL: [],
      ChartDataZRX: [],
      ChartData: {
        bnb: [{x: 0, y: 1}],
        bat: [{x: 0, y: 1}],
        gnt: [{x: 0, y: 1}],
        mkr: [{x: 0, y: 1}],
        omg: [{x: 0, y: 1}],
        rep: [{x: 0, y: 1}],
        zil: [{x: 0, y: 1}],
        zrx: [{x: 0, y: 1}]
      }
    };
  }
  UpdateChartData = (token,i,price) =>{
    if(token === 'mkr')
      this.setState(state => {
        return {
          ...state,
          ChartDataMKR: [...state.ChartDataMKR, { x: i,y: price }]
        }
      })

    else if(token === 'bnb')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataBNB, { x: i,y: price }]
        }
      })
    else if(token === 'bat')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataBAT, { x: i,y: price }]
        }
      })
    else if(token === 'zil')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataZIL, { x: i,y: price }]
        }
      })
    else if(token === 'omg')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataOMG, { x: i,y: price }]
        }
      })
    else if(token === 'gnt')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataGNT, { x: i,y: price }]
        }
      })
    else if(token === 'zrx')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataZRX, { x: i,y: price }]
        }
      })

    else if(token === 'rep')
      this.setState(state => {
        return {
          ...state,
          ['ChartData'+token.toUpperCase()]: [...state.ChartDataREP, { x: i,y: price }]
        }
      })

  }
  getChartData = (token)=> {
    axios.get(`https://api.tokenanalyst.io/analytics/last?job=${token}_volume_30day_v5&format=json`)
        .then(res => {
        //  console.log(token)
          this.setState({
            ['ChartData'+token.toUpperCase()]: []
          })
          for(let i=0; i <= 30;i++){
            var price = res.data[i].price_usd

            if(token === 'mkr')
              this.UpdateChartData(token,i,price)
            else if(token === 'bnb')
              this.UpdateChartData(token,i,price)
            else if(token === 'bat')
              this.UpdateChartData(token,i,price)
            else if(token === 'zil')
              this.UpdateChartData(token,i,price)
            else if(token === 'omg')
              this.UpdateChartData(token,i,price)
            else if(token === 'gnt')
              this.UpdateChartData(token,i,price)
            else if(token === 'zrx')
              this.UpdateChartData(token,i,price)
            else if(token === 'rep')
              this.UpdateChartData(token,i,price)
          }
        })
        .catch(err => {

        })
  }
  createFakeData(){
    // This function creates data that doesn't look entirely random
    const data = []

    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }
  GetTokenData = (token) => {
    this.getChartData(token);
    axios.get(`https://api.tokenanalyst.io/analytics/last?job=${token}_volume_24h_rolling_v5&format=json`)
    .then(res => {
    //  console.log(res.data[0])
      this.setState(state => {
        return {
          ...state,
          TokenList: [ ...state.TokenList, {
            token : token,
            current_24h: res.data[0].current_24h,
            current_24h_usd: res.data[0].current_24h_usd,
            prior_24h: res.data[0].prior_24h,
            prior_24h_usd: res.data[0].prior_24h_usd,
            percent_change: res.data[0].percent_change
            } ]
        }
      })
    })

    .catch(err => {
      console.log(err)
    })
  }
componentDidMount(){

 // console.log('hello sds');
 this.GetTokenData('bnb');
 this.GetTokenData('bat');
 this.GetTokenData('gnt');
 this.GetTokenData('mkr');
 this.GetTokenData('omg');
 this.GetTokenData('rep');
 this.GetTokenData('zil');
 this.GetTokenData('zrx');
}
getIcon(token){
  if(token === 'mkr')
    return'https://s2.coinmarketcap.com/static/img/coins/32x32/1518.png'
  else if(token === 'bnb')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/1839.png'
  else if(token === 'bat')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/1697.png'
  else if(token === 'zil')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/2469.png'
  else if(token === 'omg')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/1808.png'
  else if(token === 'gnt')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/1455.png'
  else if(token === 'zrx')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/1896.png'
  else if(token === 'rep')
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/1104.png'
}
    getChartState = (token) =>{
      if(token === 'mkr')
        return this.state.ChartDataMKR
      else if(token === 'bnb')
        return this.state.ChartDataBNB
      else if(token === 'bat')
        return this.state.ChartDataBAT
      else if(token === 'zil')
        return this.state.ChartDataZIL
      else if(token === 'omg')
        return this.state.ChartDataOMG
      else if(token === 'gnt')
        return this.state.ChartDataGNT
      else if(token === 'zrx')
        return this.state.ChartDataZRX
      else if(token === 'rep')
        return this.state.ChartDataREP
    }

  render() {
    return (
      <div>
      <br/><br/>
      
        { /* <h2>Stock List</h2> */ }
        <table style={{maxWidth: '1200px', margin: '0 auto'}} className="table text-center">
          <thead className="thead-dark">
            <tr>
              <th>Token</th>
              <th>Volume</th>
              <th>Supply</th>
              <th>Price</th>
              {/*<th>Price Change</th>*/}
              <th>Changes</th>
              <th>Changes</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.TokenList.map((data,i) => (
              <tr key={i}>
                <td className='text-left'>
                <Link to={'/token-history/'+data.token}>
                <img src={this.getIcon(data.token)} alt='' className="token-icon" />{data.token.toUpperCase()}</Link></td>
                <td>{parseFloat(data.current_24h).toFixed(4)}</td>
                <td>{data.current_24h_usd.toFixed(4)}</td>
                <td>{(data.current_24h_usd / parseFloat(data.current_24h)).toFixed(4)}</td>
           
                <td className={
                  (Number(data.percent_change) < 0 )? 'low-price text-right' : 'high-price text-right'}>

                  {parseFloat(data.percent_change).toFixed(2)+'%'}{data.percent_change < 0 ? (' ▼') : (' ▲')}</td>
                <td><LineChart data={this.getChartState(data.token)}/></td>
              </tr>
            ))
          }
          
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default Home
