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
    var childNodes;
    var classObj;


    if (this.props.node.childNodes != null) {
      childNodes = this.props.node.childNodes.map(function(node, index) {


        return (<li className='container' key={index}><TreeNode node={node} /></li>);
      });

      classObj = {
        togglable: true,
        "togglable-down": this.state.visible,
        "togglable-up": !this.state.visible
      };
    }

    var style;
    if (!this.state.visible) {
      style = {display: "none"};
    }

    //  Check if node 
    if (Object.keys(this.props.node).length<3){var lastNode='last-node';}
    // if (!this.props.node.childNodes) {var lastNode='last-node' }; 
    

    if (typeof this.props.node.childNodes != "undefined") {
        children=this.props.node.childNodes.length;
        if (children>1) {var children='multiple-nodes';} else {var children='single-nodes';}
    }

    return (
      <ul>
        <li className={lastNode}>
        <h5 onClick={this.toggle} className={classNames(classObj)}>
          <span className='providerDetails'>Provider ID:{this.props.node.branch[0].companyID} - Name:{this.props.node.branch[0].companyName}</span>
          <span className='alert'><span>!</span></span>
        </h5>

            <ul className={children} style={style}>
          {childNodes}
            </ul>
        </li>
      </ul>
    );
  }
}

let example = (
  <USPTemplate>Hello, world!</USPTemplate>
);
ReactDOM.render(example, document.getElementById('react-example'));