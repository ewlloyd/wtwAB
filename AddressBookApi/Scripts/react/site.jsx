class LocationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ""
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
          <input type={this.props.type}
                 onChange={this.handleChange}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 value={this.state.value} />
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
    this.state = Object.assign({ editMode: props.editMode }, props.location);

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  setEditMode(value) {
    this.setState({ editMode: value });
  }

  handleEditClick(event) {
    this.setEditMode(true);
  }

  handleCancelClick(event) {
    this.setEditMode(false);
  }

  handleSaveClick(event) {
    this.props.saveLocation(this.state);
    this.setEditMode(false);
  }

  handleDeleteClick(event) {
    this.props.deleteLocation(this.props.location);
    this.setEditMode(false);
  }

  render() {
    return (
      <form>
        <button className="pull-right" role="button" hidden={this.state.editMode} onClick={this.handleEditClick}>Edit</button>
        <button className="pull-right" role="button" hidden={this.state.editMode} onClick={this.handleDeleteClick}>Delete</button>
        <button className="pull-right" role="button" hidden={!this.state.editMode} onClick={this.handleCancelClick}>Cancel</button>
        <button className="pull-right" role="button" hidden={!this.state.editMode} onClick={this.handleSaveClick}>Save</button>

        <LocationField editMode={this.state.editMode} type="text" handleChange={this.handleChange} placeholder="Name" value={this.state.name} />
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
      id: props.contact.id,
      firstName: props.contact.firstName,
      lastName: props.contact.lastName
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  // TODO: DRY this mess up. Still wobbly with how to cleanly hand off the editMode state to the calling component:
  setEditMode(value) {
    this.setState({ editMode: value });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEditClick(event) {
    this.setEditMode(true);
  }

  handleCancelClick(event) {
    this.setEditMode(false);
  }

  handleSaveClick(event) {
    this.props.saveContact(this.state);
    this.setEditMode(false);
  }

  handleDeleteClick(event) {
    // Delete contact from server
    this.props.deleteContact(this.props.contact.id);
  }

  render() {
    if (this.state.editMode) {
      return (
        <form className="form-inline">
          <button className="pull-right" role="button" onClick={this.handleCancelClick}>Cancel</button>
          <button className="pull-right" role="button" onClick={this.handleSaveClick}>Save</button>
          <div className="form-group">
            <input type="text" className="form-control" 
                   onChange={this.handleChange} placeholder="First Name" name="firstName" value={this.state.firstName} />
            <input type="text" className="form-control" 
                   onChange={this.handleChange} placeholder="Last Name" name="lastName" value={this.state.lastName} />
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

class ContactListing extends React.Component {
  render() {
    var contact = this.props.selected;
    if (contact) {
      var locations = contact.locations.map(location => {
        return <li key={location.id }><Location location={location}
                                                saveLocation={(location)=>this.props.saveLocation(location)}
                                                deleteLocation={(location)=>this.props.deleteLocation(location)}
                                                editMode={this.props.editMode } /></li> });
      return (
        <div>
          <Contact key={contact.id}
                   contact={contact}
                   editMode={this.props.editMode}
                   saveContact={(contact)=>this.props.saveContact(contact)}
                   selectContact={(contact)=>this.props.selectContact(contact)}
                   deleteContact={(contact)=>this.props.deleteContact(contact)}
                   saveLocation={(location)=>this.props.saveLocation(location)}
                   deleteLocation={(location)=>this.props.deleteLocation(location)}/>
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

class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var nodes = this.props.book.map(function (contact) {
      return (
        <li key={contact.id}>
          <a href="#" onClick={() => this.props.selectContact(contact)}>{contact.firstName}&nbsp;{contact.lastName}</a>
        </li>
        );
    }, this);
    return (
      <div className="row">
        <div className="col-md-4">
          <ul>{nodes}</ul>
        </div>
        <div className="col-md-8">
          <ContactListing selected={this.props.selected}
                          saveContact={(contact)=>this.props.saveContact(contact)}
                          selectContact={(contact)=>this.props.selectContact(contact)}
                          deleteContact={(contact)=>this.props.deleteContact(contact)} 
                          saveLocation={(location)=>this.props.saveLocation(location)}
                          deleteLocation={(location)=>this.props.deleteLocation(location)}/>
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

  saveContact(contact) {
    Api.saveContact(contact);
    this.render();
  }

  selectContact(contact) {
    this.setState({ selected: contact });
    this.render();
  }

  deleteContact(contact) {
    Api.deleteContact(contact.id);
    this.render();
  }

  saveLocation(location) {
    Api.saveLocation(this.state.selected.id, location);
    this.render();
  }

  deleteLocation(location) {
    Api.deleteLocation(this.state.selected.id, location.id);
    this.render();
  }

  render() {
    return (
        <div>
            <ContactList book={this.state.book}
                         selected={this.state.selected}
                         saveContact={(contact)=>this.saveContact(contact)}
                         selectContact={(contact)=>this.selectContact(contact)}
                         deleteContact={(contact)=>this.deleteContact(contact)}
                         saveLocation={(location)=>this.saveLocation(location)}
                         deleteLocation={(location)=>this.deleteLocation(location)} />
        </div>
      );
  }
};

ReactDOM.render(<AddressBook />, document.getElementById('reactRoot'));
