import React from 'react'
class AddProperty extends React.Component{
    state = {
        selectedImage: null,
        street: null,
    }
    handleFormSubmit = (event) =>{
        event.preventDefault();
        let newData = new FormData();
        newData.append('street', event.target.street.value);
        for(let i = 0; i < this.state.selectedImage.length; i++){
            newData.append('image', this.state.selectedImage[i]);
        }
        console.log(this.state.selectedImage);
        this.props.handleAddProperty(newData);
    }
    imageInputHandler = (event) =>{
        console.log(event.target.files);
        this.setState({selectedImage: event.target.files});
    }
    render(){
        
        return(
            <div>
                <h1>Add new property</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label className='input-label'> Address: </label>
                    <label className='input-label'>Street</label>
                    <input type='text' name='street' className='input'/>
                    <label htmlFor='city' className='input-label'>City</label>
                    <input type='text' name='city' id='city'
                            className={`input ${true? 'input--error': ''}`}  
                            onChange={this.handleChange} 
                    />
                    <label htmlFor='rooms' className='input-label'>Number of rooms:</label>
                    <input type='number' name='rooms' id='rooms' className='input'/>
                    <label htmlFor='washrooms' className='input-label'>Number of washrooms:</label>
                    <input type='number' name='washrooms' id='washrooms' className='input'/>
                    <label htmlFor='description' className='input-label'>Description</label>
                    <input type='text' name='description' id='description' className='input'/>
                    <label htmlFor='recentUpgrade' className='input-label'>Recent Upgrade</label>
                    <input type='text' name='recentUpgrade' id='recentUpgrade' className='input'/>
                    <label htmlFor='askingPrice' className='input-label'>Asking Price:</label>
                    <input type='text' name='askingPrice' id='askingPrice' className='input'/>
                    <label className='input-label'>Image</label>
                    <input type='file' name='image' multiple onChange={this.imageInputHandler}/>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        )
    }
}
export default AddProperty