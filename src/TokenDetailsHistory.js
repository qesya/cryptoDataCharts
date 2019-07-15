import React, { Component } from 'react';
import axios from 'axios'
import DetailChart from './Components/DetailChart/App'

class TokenDetailsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        number_of_token_transfers: '',
      HistoryList: [],
      CurrentToken: this.props.match.params.token,
      TokenDetail: {
        Price: '0',
        CurrentCount: '0',
        PreCount: '0',
        CountChange: '0',
        Volume: '0',
        TotalTerover: '0',
        Changes: '0'
      }
    };
  
  }
  componentDidMount(){
    this.getSingleTokenInfo(this.state.CurrentToken);
    this.getHistoryData(this.state.CurrentToken);
  }
  getSingleTokenInfo = (token) =>  {
    axios.all([
     axios.get(`https://api.tokenanalyst.io/analytics/last?job=${token}_volume_24h_rolling_v5&format=json`),
     axios.get(`https://api.tokenanalyst.io/analytics/last?job=${token}_count_24h_rolling_v5&format=json`)
   ])
   .then(axios.spread( (dat1, dat2) => {

    let Result = dat1.data.concat(dat2.data);

    this.setState({
      TokenDetail: 
       {Price: Result[0].current_24h_usd / Result[0].current_24h,
        CurrentCount: Result[1].current_24h,
        PreCount: Result[1].prior_24h,
        CountChange: Result[1].percent_change,
        Volume: Result[0].current_24h,
        TotalTerover: Result[0].current_24h_usd,
        Changes: Result[0].percent_change  
       }
    })

   }))
   .catch(error => console.log(error));
  }
  SetData = (dat1, dat2,i) => {
      this.setState(state => {
          const data1 = dat1.data.sort(function(a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          const data2 = dat2.data.sort(function(a, b) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          return {
              ...state,
              HistoryList: [
                  ...state.HistoryList,
                  {
                      number_of_token_transfers: dat1.data[i].number_of_txns,
                      tokenaddress: data1[i].tokenaddress,
                      date: data1[i].date,
                      volume: data2[i].volume,
                      price_usd: data2[i].price_usd,
                      volume_usd: data2[i].volume_usd
                  }]
          }
      })
  }
  getHistoryData = (token) => {
      axios.all([
     axios.get(`https://api.tokenanalyst.io/analytics/last?job=${token}_count_30day_v5&format=json`),
     axios.get(`https://api.tokenanalyst.io/analytics/last?job=${token}_volume_30day_v5&format=json`)
   ])
   .then(axios.spread( (dat1, dat2) => {

     for(var i=0;i<dat1.data.length;i++){
         this.SetData(dat1, dat2,i);

     }
    // let Result = dat1.data.concat(dat2.data);
    //console.log(this.state.HistoryList)
   }))
   .catch(error => console.log(error));

  }
  getIcon(token)
  {

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
  render() {
    return ( <div className="history-container">
        <h1 style={{textAlign: 'center'}}><img className="token-main-icon" src={this.getIcon(this.state.CurrentToken)} alt="" />{this.state.CurrentToken.toUpperCase()}</h1>

        <table className="table table-dark history-table">
          <tbody className="">
          <tr>
              <td><h2>Price: </h2></td>
              <td><h2>{parseFloat(this.state.TokenDetail.Price).toFixed(4)}</h2></td>
            </tr>
            <tr>
              <td><h2>Current Count: </h2></td>
              <td><h2>{this.state.TokenDetail.CurrentCount}</h2></td>
            </tr>
            <tr>
              <td><h2>Previous Count: </h2></td>
              <td><h2>{this.state.TokenDetail.PreCount}</h2></td>
            </tr>
            <tr>
              <td><h2>Count Changes: </h2></td>
              <td
              className={
                  (Number(this.state.TokenDetail.CountChange) < 0 )? 'low-price' : 'high-price '}
              ><h2>
              {parseFloat(this.state.TokenDetail.CountChange).toFixed(2)+'%'}{this.state.TokenDetail.CountChange < 0 ? (' ▼') : (' ▲')}
              </h2></td>
            </tr>
             <tr>
              <td><h2>Volume: </h2></td>
              <td><h2>{parseFloat(this.state.TokenDetail.Volume).toFixed(4)}</h2></td>
            </tr>
            <tr>
              <td><h2>Total Ternover: </h2></td>
              <td><h2>{parseFloat(this.state.TokenDetail.TotalTerover).toFixed(4)}</h2></td>
            </tr>
            <tr>
              <td><h2>Changes: </h2></td>
              <td
                className={
                  (Number(this.state.TokenDetail.Changes) < 0 )? 'low-price' : 'high-price '}
              ><h2>
              {parseFloat(this.state.TokenDetail.Changes).toFixed(2)+'%'}{this.state.TokenDetail.Changes < 0 ? (' ▼') : (' ▲')}
              
              </h2></td>
            </tr>
          </tbody>
        </table>

        <DetailChart token={this.state.CurrentToken} />
            <br/> 
      <div className="history-detail-table">
        <h2>History Details</h2> <hr/>
        <table className='table text-center ' >
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Volume</th>
              <th>Price</th>
              <th>Turnover</th>
              <th>Token Transaction</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.HistoryList.map((dat,i) => (
              <tr key={i}>
                <td>{dat.date}</td>
                <td>{ parseFloat(dat.volume).toFixed(4)}</td>
                <td>{ parseFloat(dat.price_usd).toFixed(4)}</td>
                <td>{ parseFloat(dat.volume_usd).toFixed(4)}</td>
                <td>{dat.number_of_token_transfers}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
</div>)
  }
}
export default TokenDetailsHistory;