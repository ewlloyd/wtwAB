class LocationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    if (this.props.editMode) {
      return (
        <div className="form-group">
        <input type={this.props.type} onChange={this
          .handleChange} className="form-control" placeholder={this.props.placeholder} value={this.state.value} />
        </div>
      );
    } else {
      return (
        <div>{this.state.value}</div>
      );
    }
  }
}

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.location);
    this.state.editMode = props.editMode;
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleEditClick(event) {
    this.setState({ editMode: !this.state.editMode });
  }

  handleSaveClick(event) {
    // TBD
    this.setState({ editMode: !this.state.editMode });
  }

  handleDeleteClick(event) {
    // TBD
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    return (
      <form>
        <button className="pull-right" role="button" hidden={this.state.editMode} onClick={this.handleEditClick}>Edit</button>
        <button className="pull-right" role="button" hidden={this.state.editMode} onClick={this.handleDeleteClick}>Delete</button>
        <button className="pull-right" role="button" hidden={!this.state.editMode} onClick={this.handleEditClick}>Cancel</button>
        <button className="pull-right" role="button" hidden={!this.state.editMode} onClick={this.handleSaveClick}>Save</button>

        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="Name" value={this.state.id} />
        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="Address 1" value={this.state.address1} />
        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="Address 2" value={this.state.address2} />
        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="City" value={this.state.city} />
        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="State" value={this.state.state} />
        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="Postal Code" value={this.state.postalCode} />
        <LocationField editMode={this.state.editMode} type="email" handleChange={this.handleChange} placeholder="Email" value={this.state.email} />
        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="Phone" value={this.state.phone} />
      </form>
    );
  }
};

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: props.editMode,
      firstName: props.contact.firstName,
      lastName: props.contact.lastName
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleEditClick(event) {
    this.setState({ editMode: !this.state.editMode });
  }

  handleSaveClick(event) {
    // TBD
    this.setState({ editMode: !this.state.editMode });
  }

  handleDeleteClick(event) {
    // TBD
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    if (this.state.editMode) {
      return (
        <form className="form-inline">
          <button className="pull-right" role="button" onClick={this.handleEditClick}>Cancel</button>
          <button className="pull-right" role="button" onClick={this.handleSaveClick}>Save</button>
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleChange} placeholder="First Name" value={
            this.state.firstName} />
            <input type="text" className="form-control" onChange={this.handleChange} placeholder="Last Name" value={
            this.state.lastName} />
          </div>
        </form>
      );
    } else {
      return (
        <div>
          <button className="pull-right" role="button" onClick={this.handleEditClick}>Edit</button>
          <button className="pull-right" role="button" onClick={this.handleDeleteClick}>Delete</button>
          <h4>{this.state.firstName}&nbsp;{this.state.lastName}</h4>
        </div>
      );
    }
  }
}

class AddressListing extends React.Component {
  render() {
    var contact = this.props.selected;
    if (contact) {
      var locations = contact.locations.map(location => { return <li key={location.id}><Location location={location} editMode={this.props.editMode}/></li> });
      return (
        <div>
          <Contact key={contact.id} contact={contact} editMode={this.props.editMode} />
          <div className="panel-group">
            <div className="panel">
                <ul>{locations}</ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Please select an entry at left</div>);
    }
  }
};

class AddressList extends React.Component {
  render() {
    var nodes = this.props.book.map(function (address) {
      return (
        <li key={address.id}>
          <a href="#" onClick={() => this.props.selectAddress(address)}>{address.firstName}&nbsp;{address.lastName}</a>
        </li>
        );
    }, this);
    return (
      <div className="row">
        <div className="col-md-4">
          <ul>{nodes}</ul>
        </div>
        <div className="col-md-8">
          <AddressListing selected={this.props.selected}></AddressListing>
        </div>
      </div>
    );
  }
};

class AddressBook extends React.Component {
  componentWillMount() {
    this.setState({ book: [] });
  }

  componentDidMount() {
    var self = this;
    Api.getAddressBook()
      .done(function (data) {
        self.setState({ book: data });
        self.render();
      });
  }

  selectAddress(address) {
    this.setState({ selected: address });
    this.render();
  }

  render() {
    return (
        <div>
            <AddressList book={this.state.book} selected={this.state.selected} selectAddress={(address)=>this.selectAddress(address)} />
        </div>
      );
  }
};

ReactDOM.render(<AddressBook />, document.getElementById('reactRoot'));
