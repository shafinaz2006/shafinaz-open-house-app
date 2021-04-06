import React from 'react';
import axios from 'axios';
import { baseURL } from '../../Utils/API_data';
import './Main.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from '../Home/Home';
import LeftBar from '../LeftBar/LeftBar';
import Authentication from '../Authentication/Authentication';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login';
import Logout from '../Authentication/Logout';
import CreateProfile from '../Profile/CreateProfile';
import Profile from '../Profile/Profile';
import PropertiesList from '../PropertiesList/PropertiesList';
import UserPropertiesList from '../PropertiesList/UserPropertiesList';
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import UserPropertyDetails from '../PropertyDetails/UserPropertyDetails';
import AssociateList from '../Associates/AssociateList';
import AssociateDetails from '../Associates/AssociateDetails';
import AddProperty from '../AddUpdateProperty/AddProperty';
import UpdateProperty from '../AddUpdateProperty/UpdateProperty';
import BuyerChecklist from '../Checklist/BuyerChecklist';
import SellerChecklist from '../Checklist/SellerChecklist';
import DeleteProperty from '../DeleteProperty/DeleteProperty';
import TestComponent from '../TestComponent';
import Cookies from 'js-cookie';

class Main extends React.Component {

    state = {
        properties: '',
        allUserProfiles: '',
        sellers: '',
        associates: '',
        userProperties: '',
        
        errorMessageReg:'',
        errorMessageLogin: '',
        errorMessageCreateProfile: '',
        currentUserId: '',
        currentUserName: '',
    }

// Handle Registration:

    handleRegistration = (newUser) =>{
        // console.log('in handleRegistration method', newUser);
        axios
            .post(`${baseURL}/register`, newUser)
            .then(response =>{
                if(response.data.message.failure){
                    this.setState({errorMessageReg: response.data.message.failure})
                }
                else{
                    console.log('response data after login', response.data);
                    this.setState({currentUserId: response.data.user.userId,
                                    currentUserName: response.data.user.username});
                    let username = response.data.user.username;
                    let userId = response.data.user.userId;
                    this.props.handleCookie(username, userId)
                }
            })
            .catch(error => {
                console.log('Error in User Registration', error);
                this.setState({errorMessageReg:'Registration is not completed.!!'})
            });
    }

// Handle Login:

    handleLogin = (user) =>{
        axios
            .post(`${baseURL}/login`, {username: user.username, password: user.password}, {withCredentials: true})
            .then(response =>{
                if(response.data.message.failure){
                    this.setState({errorMessageLogin: response.data.message.failure})
                }
                else{
                    // console.log('response data after login', response.data);
                    this.setState({currentUserId: response.data.user.userId, currentUserName: response.data.user.username});
                    let username = response.data.user.username;
                    let userId = response.data.user.userId;
                    this.props.handleCookie(username, userId)
                }
            })
            .catch(error => {
                // console.log('Error in User Login', error);
                this.setState({errorMessageLogin:'Login again!!'})
            });
    }


// Handle Create Profile:

    handleCreateProfile = (newProfile) =>{
        axios
            .post(`${baseURL}/profile`, newProfile)
            .then(response =>{
                // console.log(response.data);
                this.setState({allUserProfiles: response.data.userProfiles, sellers: response.data.sellers, associates: response.data.associates});
            })
            .catch(error => console.log('Error to create profile', error));
    }


// Get all user profiles:

    getAllUserProfiles = () =>{
        axios
            .get(`${baseURL}/profile`)
            .then(response => {
                this.setState({allUserProfiles: response.data.userProfiles, sellers: response.data.sellers, associates: response.data.associates});
            })
            .catch(error => console.log('Error in all user profiles data', error))
    }


// Get all associates data:

    getAssociatesData = () =>{
        axios
            .get(`${baseURL}/associates`)
            .then(response => {
                this.setState({associates: response.data});
            })
            .catch(error => console.log('Error in associates data', error))
    }

// Get all sellers data:

    getSellersData = () =>{
        axios
            .get(`${baseURL}/sellers`)
            .then(response => {
                // console.log('sellers data in main', response.data)
                this.setState({sellers: response.data});
            })
            .catch(error => console.log('Error in sellers data', error))
    }


// Get all properties data:

    getPropertiesData = () =>{
        axios
            .get(`${baseURL}/properties`)
            .then(response => {
                // console.log(response.data);
                this.setState({properties: response.data});
            })
            .catch(error => console.log('Error in properties data', error))
    }

// Get user properties data:

    getUserPropertiesData = () =>{
        axios
            .get(`${baseURL}/users/${Cookies.get('userId')}/properties`)
            .then(response => {
                // console.log(response.data);
                this.setState({userProperties: response.data});
            })
            .catch(error => console.log('Error in properties data', error))
    }

// Post new property:

    addProperty = (newProperty) =>{
        console.log(newProperty);
        axios
            .post(`${baseURL}/users/${Cookies.get('userId')}/properties`, newProperty)
            .then(response =>{
                this.setState({properties: response.data.properties, userProperties: response.data.userProperties});
            })
            .catch(error => console.log('Error in add new property', error));
    }

// Edit Property:

    updateProperty = (propertyData, propertyId) =>{
        console.log('update property request', propertyData);
        axios
            .put(`${baseURL}/users/${Cookies.get('userId')}/properties/${propertyId}/edit`, propertyData)
            .then(response =>{
                this.setState({properties: response.data.properties, userProperties: response.data.userProperties});
            })
            .catch(error => console.log('Error in add new property', error));
    }

// Delete User Property:

    deleteProperty = (propertyId) =>{
        let deleteURL = `${baseURL}/users/${Cookies.get('userId')}/properties/${propertyId}`
        axios
            .delete(deleteURL)
            .then(response => {
                // console.log('Property Deleted. Response status from delele request', response.status);
                this.setState({properties: response.data.properties, userProperties: response.data.userProperties});
            })
            .catch(error => {
                console.log('Delete post has error: ', error);
            })
    }

// CompoundDidMount():

    componentDidMount() {
        this.getPropertiesData();
        this.getUserPropertiesData();
        this.getAllUserProfiles();
        this.getAssociatesData();
        this.getSellersData(); 
    }
    // console.log()
    render(){
        if(this.state.allUserProfiles && this.state.properties && this.state.associates){
            return (
                <main className='pageContainer'>
                    <LeftBar className='pageContainer__list' />
                    <div className='pageContainer__content'>
                        <BrowserRouter>
                            <Switch>
                                <Redirect from='/home' to='/'/>
                                <Route path='/' exact component={Home}/>
                                <Route path='/authenticate' exact component={Authentication}/>
                                <Route path='/register' exact 
                                    render={(routerProps) =>{
                                        return <Register errorMsg={this.state.errorMessageReg} 
                                                         handleRegistration={this.handleRegistration} {...routerProps}/>
                                    }}
                                />
                                <Route path='/login' exact 
                                 render={(routerProps) =>{
                                    return <Login errorMsg={this.state.errorMessageLogin} 
                                                     handleLogin={this.handleLogin} {...routerProps}/>
                                }}
                                />
                                <Route path='/logout' exact 
                                    render={(routerProps) =>{ return <Logout handleLogout={this.handleLogout}{...routerProps}/>}}
                                />
                                 <Route path='/users/:userId/create-profile' exact 
                                 render={(routerProps) =>{
                                    return <CreateProfile errorMsg={this.state.errorMessageCreateProfile} currentUserId={this.state.currentUserId}
                                                     handleCreateProfile={this.handleCreateProfile} 
                                                     allUserProfiles={this.state.allUserProfiles}{...routerProps}{...routerProps}/>
                                }}
                                />
                                <Route path='/users/:userId/profile' exact 
                                        render={(routerProps) =>{
                                            return <Profile allUserProfiles={this.state.allUserProfiles}{...routerProps}/>
                                        }}
                                />
                                <Route path='/users/:userId/properties/add-property' exact
                                    render={(routerProps) =>{
                                        return <AddProperty handleAddProperty ={this.addProperty} {...routerProps}/>
                                    }}
                                />
                                <Route path='/users/:userId/properties' exact 
                                        render={(routerProps) =>{
                                            return <UserPropertiesList properties={this.state.userProperties}
                                             {...routerProps}/>
                                        }}
                                />
                                <Route path='/users/:userId/properties/:propertyId' exact 
                                        render={(routerProps) =>{
                                            return <UserPropertyDetails property=
                                                {this.state.userProperties.find(property => 
                                                    property.propertyId === routerProps.match.params.propertyId 
                                                    )} handleDeleteProperty={this.deleteProperty} {...routerProps}/>
                                        }}
                                />
                                <Route path='/users/:userId/properties/:propertyId/delete' exact component={DeleteProperty}/>
                                <Route path='/users/:userId/properties/:propertyId/edit' exact
                                    render={(routerProps) =>{
                                        return <UpdateProperty property=
                                            {this.state.properties.find(property => 
                                                    property.propertyId === routerProps.match.params.propertyId 
                                                )} handleUpdateProperty={this.updateProperty} {...routerProps}/>
                                    }}
                                />
                                <Route path='/properties' exact
                                    render={(routerProps) =>{
                                        return <PropertiesList properties={this.state.properties} {...routerProps}/>
                                    }}
                                />
                                
                                <Route path='/properties/:propertyId' exact
                                    render={(routerProps) =>{
                                        return <PropertyDetails property=
                                                {this.state.properties.find(property => property.propertyId === routerProps.match.params.propertyId)} {...routerProps}/>
                                    }}
                                />
                                <Route path='/associates' exact
                                    render={(routerProps) =>{
                                        return <AssociateList associates={this.state.associates} {...routerProps}/>
                                    }}
                                />
                                <Route path='/associates/:userId'
                                    render={(routerProps) =>{
                                        return <AssociateDetails associate=
                                                {this.state.associates.find(associate => associate.userId === routerProps.match.params.userId)} {...routerProps}/>
                                    }}
                                />
                                <Route path='/buyer-checklist' exact component={BuyerChecklist}/>
                                <Route path='/seller-checklist' exact component={SellerChecklist}/>
                                <Route path='*' exact component={TestComponent}/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </main>
            );
        } else  return( <main style={{textAlign: 'center'}}><h1>Page loading</h1></main> )
    }
}

export default Main;
