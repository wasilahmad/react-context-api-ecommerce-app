import React, { Component } from 'react';
import data from './server/data/data.json';

const CourseContext = React.createContext();

class CourseProvider extends Component {
 
  state = {
      courses:[],
      cart:[],
      isUserLogin:false,
      isModalOpen:false,      
      search:'',
      filter:{
        sortBy: ['Published Date', 'Course Duration']
      }
  }

  componentDidMount(){
    // load async data when DOM is ready
    this.setCourses();    
  }

  // load data from server and assign to courses array
  setCourses = () => {
    let tempCourses = [];

    // loaded data from local file
    data[0].lessons.forEach( item => {
      const singleItem = {...item, inCart: false, id: Math.floor(1000 + Math.random() * 9000)};
      tempCourses = [...tempCourses, singleItem];
    });

    this.setState(()=>{
      return { courses: tempCourses};
    });
  

  }

  // utility method to select item
  getItem = id => {
    const course = this.state.courses.find( item => item.id === id);
    return course;
  }

  // method to add item in the cart
  addToCart = id => {
     let tempCourses = [...this.state.courses];
     const index = tempCourses.indexOf(this.getItem(id));
     const course = tempCourses[index];
     
     // open login modal conditionally
     if(this.state.isUserLogin) {
        // to update selected course data
        course.inCart = true;

        // update course state
        this.setState(()=>{
          return {
            courses:tempCourses,
            cart:[...this.state.cart, course]
            }
        });
     } else {
       // open modal if user not login
       this.openModal();
     }
  }

  // method to remove item from the cart
  removeItem = id => {
    let tempCourses = [...this.state.courses];
    let tempCart = [...this.state.cart];
    
    // get perticular course by id
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempCourses.indexOf(this.getItem(id));
    let removeCourse = tempCourses[index];

    // reset course state
    removeCourse.inCart = false;

    // update course state
    this.setState(()=>{
      return {
       courses:[...tempCourses],
       cart:[...tempCart]
       }
    });

  }
  
  // method to handle search filter
  handleSearch = (e) => {
    this.setState({          
      search: e.target.value
    });
  }
  
  // method to filter grid by date and duration
  sortBy = (e, val) => {
    let selected = e.target.value;
    const [ publishedDate, duration ] = val;
    let tempCourses = [...this.state.courses];
    
    if (selected === publishedDate) {
      tempCourses.sort(( a, b ) => {
        if(a.publishDate > b.publishDate){
          return -1
        }else if (a.publishDate < b.publishDate){
          return 1
        }
        return 0;
      });

      this.setState({
        courses: tempCourses
      });

    } else if(selected === duration) {
      
      tempCourses.sort(( a, b ) => {
        if(a.duration > b.duration){
          return -1
        }else if(a.duration < b.duration){
          return 1
        }
        return 0;
      });

      this.setState({
        courses: tempCourses
      });
    }
  }

  // method to assign login details
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value.trim()
    });    
  }

  // method to handle login form
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = {...this.state};

    // to verify input feilds are not empty
    if(username !== undefined && password !== undefined) {
      const user = {username, password};
      
      // to store user session data
      sessionStorage.setItem('user', JSON.stringify(user));

      this.setState({
        isUserLogin: true
      });

      // close modal after successful login
      this.closeModal();
    }    
  }

  // method to open login modal
  openModal = () => {
    this.setState({
      isModalOpen:true
    });
  }

  // method to close login modal
  closeModal = () => {
    this.setState({
      isModalOpen:false
    });
  }

  // method to remove session
  logout = () => {
    sessionStorage.removeItem("user");
    this.setState({
      isUserLogin:false
    });
  }

  render() {
    return (
      <CourseContext.Provider value={{
        ...this.state,
        addToCart:this.addToCart,
        removeItem:this.removeItem,
        handleSearch:this.handleSearch,
        sortBy:this.sortBy,
        openModal: this.openModal,
        closeModal: this.closeModal,
        handleInputChange: this.handleInputChange,
        handleSubmit:this.handleSubmit,
        logout:this.logout
      }}>
        {this.props.children}
      </CourseContext.Provider>
    );
  }
  
}

const CourseConsumer = CourseContext.Consumer;

export { CourseProvider, CourseConsumer };
