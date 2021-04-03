import React from 'react';
import axios from 'axios';
import './Main.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from '../Home/Home';
import LeftBar from '../LeftBar/LeftBar';
import Authentication from '../Authentication/Authentication';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login';
import Logout from '../Authentication/Logout';
import CreateProfile from '../CreateProfile/CreateProfile';
import PropertiesList from '../PropertiesList/PropertiesList';
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import AssociateList from '../Associates/AssociateList';
import AssociateDetails from '../Associates/AssociateDetails';
import AddProperty from '../AddProperty/AddProperty';
import BuyerChecklist from '../Checklist/BuyerChecklist';
import SellerChecklist from '../Checklist/SellerChecklist';
import Cookies from 'js-cookie';

class Main extends React.Component {

    state = {
        properties: '',
        associates: '',
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
            .post('http://localhost:8080/register', newUser)
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
        console.log('in handleLogin method', user);
        axios
            .post('http://localhost:8080/login', {username: user.username, password: user.password}, {withCredentials: true})
            .then(response =>{
                if(response.data.message.failure){
                    this.setState({errorMessageLogin: response.data.message.failure})
                }
                else{
                    console.log('response data after login', response.data);
                    this.setState({currentUserId: response.data.user.userId, currentUserName: response.data.user.username});
                    let username = response.data.user.username;
                    let userId = response.data.user.userId;
                    this.props.handleCookie(username, userId)
                    // console.log(this.state.currentUserId)
                }
            })
            .catch(error => {
                // console.log('Error in User Login', error);
                this.setState({errorMessageLogin:'Login again!!'})
            });
    }

// // handle logout: 

//     handleLogout = () =>{
//         axios
//             .get('http://localhost:8080/logout')
//             .then(response => {
//                 // console.log(response.data);
//                 this.props.handleRemoveCookie();
//             })
//             .catch(error => console.log('Error in logout', error))
//     }

// Handle Create Profile:

    handleCreateProfile = (newProfile) =>{
        console.log('in handle create profile method', newProfile);
        axios
            .post('http://localhost:8080/profile', newProfile)
            .then(response =>{
                console.log(response.data);

            })
            .catch(error => console.log('Error to create profile', error));
    }
// Get all properties data:

    getPropertiesData = () =>{
        axios
            .get('http://localhost:8080/properties', { withCredentials: true })
            .then(response => {
                // console.log(response.data);
                this.setState({properties: response.data});
            })
            .catch(error => console.log('Error in properties data', error))
    }

// Get all associates data:

    getAssociatesData = () =>{
        axios
            .get('http://localhost:8080/associates')
            .then(response => {
                this.setState({associates: response.data});
            })
            .catch(error => console.log('Error in associates data', error))
    }

// Post new property:

    addProperty = (newData) =>{
        console.log(newData);
        axios
            .post('http://localhost:8080/properties', newData)
            .then(response =>{
                console.log(response.data);
            })
            .catch(error => console.log('Error in add new property', error));
    }


// CompoundDidMount():

    componentDidMount() {
        this.getPropertiesData();
        this.getAssociatesData();
    }
    
    render(){
        console.log('username in cookies-', Cookies.get('username'));
        if(this.state.properties && this.state.associates){
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
                                 render={(routerProps) =>{
                                    return <Logout 
                                                     handleLogout={this.handleLogout} {...routerProps}/>
                                }}
                                />
                               
                                 <Route path='/profile' exact 
                                 render={(routerProps) =>{
                                    return <CreateProfile errorMsg={this.state.errorMessageCreateProfile} currentUserId={this.state.currentUserId}
                                                     handleCreateProfile={this.handleCreateProfile} {...routerProps}/>
                                }}
                                />
                                <Route path='/properties' exact
                                    render={(routerProps) =>{
                                        return <PropertiesList properties={this.state.properties} {...routerProps}/>
                                    }}
                                />
                                <Route path='/properties/add-property' exact
                                    render={(routerProps) =>{
                                        return <AddProperty handleAddProperty ={this.addProperty} {...routerProps}/>
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
                            </Switch>
                        </BrowserRouter>
                    </div>
                </main>
            );
        } else   return( <main>Page loading</main> )
    }
}

export default Main;
