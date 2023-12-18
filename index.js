const DollarSign = () => {
    return (
      <div>
        <svg className="hot-air" height="111px" width="111px" version="1.1" id="Capa_1" viewBox="0 0 235.517 235.517" fill="#85bb65">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path style={{ fill: '#85bb65' }} d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473 c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549 c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251 c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843 c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021 c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029 c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12 c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549 c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"></path>
            </g>
          </g>
        </svg>
      </div>
    );
  };
  

  class Button extends React.Component {
    render() {
      const { onClick, className, children } = this.props;
  
      return (
        <button className={className} onClick={onClick} type="button">
          {children}
        </button>
      );
    }
  }
  
  class Wallet extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        init: [], // Initialize with an empty array
        adder: false,
        value: "",
        currencies: [],
        successMessage: "",
        errorMessage: "",
      };
  
      this.handleText = this.handleText.bind(this);
      this.remove = this.remove.bind(this);
      this.add = this.add.bind(this);
    }
  
    componentDidMount() {

        // Fetch wallet data from the server
        fetch('scripts/getWalletData.php')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Assuming that the data structure is { data: [{ value, time }] }
            const { data: initData } = data;
            this.setState({ init: initData });
          } else {
            console.error('Error fetching wallet data:', data.message);
          }
        })
        .catch(error => console.error('Error fetching wallet data:', error));

      // Fetch the list of currencies
      fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
        .then(response => response.json())
        .then(data => {
          const currenciesList = Object.keys(data).map(currency => {
            return {
              value: currency,
              label: `${currency} ${data[currency]}`,
            };
          });
          this.setState({ currencies: currenciesList });
        })
        .catch(error => console.error('Error fetching currencies:', error));
  
      
    }
  
    handleText(text) {
      this.setState({
        todo: {
          value: text.target.value,
          time: this.state.time,
        },
        value: text.target.value,
      });
    }
  
    remove(el) {
        fetch('scripts/deleteWalletItem.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `item_name=${encodeURIComponent(el.value)}`,
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              const update = this.state.init.filter(e => e !== el);
              this.setState({ init: update, successMessage: "Item deleted successfully", errorMessage: "" });
            } else {
              console.error('Error deleting wallet item:', data.message);
              this.setState({ successMessage: "", errorMessage: "Error deleting item" });
            }
          })
          .catch(error => {
            console.error('Error deleting wallet item:', error);
            this.setState({ successMessage: "", errorMessage: "Network error" });
          });
      }
    
      add(e) {
        e.preventDefault();
        e.stopPropagation();
    
        const { init, value } = this.state;
    
        if (!value.trim()) {
          this.setState({ successMessage: "", errorMessage: "Please enter a value." });
          return;
        }
    
        fetch('scripts/addWalletData.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `item_name=${encodeURIComponent(value)}`,
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              if (data.message === 'Currency already added!') {
                this.setState({ successMessage: "", errorMessage: data.message });
              } else {
                const updatedInit = [...init, { value, time: new Date().toISOString() }];
                this.setState({ init: updatedInit, successMessage: "Item added successfully", errorMessage: "" });
              }
            } else {
              this.setState({ successMessage: "", errorMessage: data.message });
            }
          })
          .catch(error => {
            console.error('Error:', error);
            this.setState({ successMessage: "", errorMessage: "Network error" });
          });
    }
    
  
    showAdder() {
      this.setState({ adder: true });
    }
  
    render() {
      return (
        <div>
          {this.state.successMessage && <div className="success-message">{this.state.successMessage}</div>}
          {this.state.errorMessage && <div className="error-message">{this.state.errorMessage}</div>}

          <div className="todo">
            {this.state.init.map((e, i) => (
                <div style={e.style} className="task" key={i}>
                    <div className="content">
                    <div className="left">{e.value}</div>
                    </div>
                    <button onClick={() => this.remove(e)} className="right">
                    ×
                    </button>
                </div>
            ))}

          </div>
          <div className="addControls">
            <form className={this.state.adder ? 'appear form' : 'form'}>
              <select
                onChange={this.handleText}
                className="input shadow"
                value={this.state.value}
                required
              >
                <option value="" disabled>Select...</option>
                {this.state.currencies.map((currency, index) => (
                  <option key={index} value={currency.label}>{currency.label}</option>
                ))}
              </select>
              <Button className="add shadow" onClick={e => this.add(e)} type="button">
                +
              </Button>
            </form>
            <button
              onClick={() => this.showAdder()}
              className="plusButton shadow"
            >
              <svg className="plusIcon" width="38" height="38" viewBox="0 0 38 38" fill="#85bb65">
                <g id="+">
                  <path
                    id="Stroke 112"
                    d="M0 0H32.6733"
                    transform="translate(2.97028 18.3466)"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Stroke 113"
                    d="M0 0V32.6733"
                    transform="translate(18.6534 2.66339)"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      );
    }
  }
  
  class Card extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: true
      };
      this.switchToTasks = this.switchToTasks.bind(this);
    }
    switchToTasks() {
      this.setState({ data: false });
    }
    render() {
      const { data } = this.state;
      return (
        <div className="card shadow gradient" style={{ backgroundImage: 'linear-gradient(187deg, #fff 40.25%, #0B3 77.6%), url(https://mybroadband.co.za/news/wp-content/uploads/2018/04/FNB-Header.jpg)', backgroundSize: 'cover', height: '100vh' }}>
            <div className={data ? "" : "none"}>
            <DollarSign />
            <div className="start">
                <div className="text">
                <h1>Your wallet is ready to go!</h1>
                <p>View your existing currencies and add new ones to enhance your wallet.</p>
                </div>
                <Button
                className="add shadow"
                onClick={() => {
                    this.switchToTasks();
                }}
                >
                View
                </Button>
            </div>
            </div>
            <div className={!data ? "appear" : "none"}>
                <Wallet />
            </div>
        </div>
      );
    }
  }
  
  class App extends React.Component {
    render() {
      return (
        <Card />
      );
    }
  }
  
  ReactDOM.render(<App />, document.querySelector("#root"));
  