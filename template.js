class USPTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: Immutable.Map({
        results: Immutable.List()
      })
    }
    this._xhrSuccess = this._xhrSuccess.bind(this);
  }
  
	_xhrSuccess(response) {
    this.setState(({data}) => ({
    	data: data.update('results', v => Immutable.fromJS(response.results))
    }));
  }
  
  _xhrResponse() {
  	return [
    	{id: 1, value: 'This'},
      {id: 2, value: 'is'},
      {id: 3, value: 'a'},
      {id: 4, value: 'test.'}
    ]
  }
  
  _fetchData() {
  	new Request.JSON({
    	url: '/echo/json/',
    	data: {
        json: JSON.encode({
          results: this._xhrResponse()
        }),
        delay: 1
    	},
    	onSuccess: this._xhrSuccess
		}).send();
  }
  
  componentDidMount() {
  	this._fetchData();
  }
  
  render() {
    let results = this.state.data.get('results');
    let h2Content = results.valueSeq().map(result => <span key={result.get('id')}>{result.get('value')} </span>);
    
    return(
      <div>
      	<h1>{this.props.children}</h1>
      	<h2>{h2Content}</h2>
      </div>
    )
  }
}

let example = (
  <USPTemplate>Hello, world!</USPTemplate>
);
ReactDOM.render(example, document.getElementById('react-example'));