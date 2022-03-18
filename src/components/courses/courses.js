import React from 'react';
import PageTitle from '../page-title/page-title';
import { CourseConsumer } from '../../context';


const Courses = (props) => {
    return (
        <main role="main" className="container">
        <PageTitle text="Courses"></PageTitle>
        
        <div className="row">
            <div className="col-sm-9">
                <div className="row mb-2">
                    <div className="col-sm-4">
                        <div className="form-group row">
                            <div className="col-sm-10">
                            <CourseConsumer>
                            {
                                (value) => {
                                    return (
                                        <input type="text" onChange={(e) => value.handleSearch(e) } className="form-control" id="input-search" placeholder="Search by course name" />
                                    )
                                }
                            }
                            </CourseConsumer>                            
                            </div>
                        </div>          
                    </div>
                    <div className="col-sm-6 offset-sm-2">
                        <div className="form-group row">
                            <label className="col-sm-3 offset-sm-3 col-form-label">Sort By:</label>
                            <div className="col-sm-6">                        
                                <CourseConsumer>
                                {
                                    (value) => {
                                        return (
                                            <select className="form-control" onChange={(e) => value.sortBy(e, value.filter.sortBy)}>
                                                <option>Published Date</option>
                                                <option>Course Duration</option>
                                            </select>
                                        )
                                    }
                                }
                                </CourseConsumer>
                            </div>
                        </div>          
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-9">
                <table className="table table-courses">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Author</th>
                        <th scope="col">Published On</th>
                        <th scope="col">Duration</th>
                        <th scope="col"></th>
                    </tr>                  
                    </thead>
                    <tbody>
                    <CourseConsumer>
                        {
                            (value) => {
                                
                                // filter grid data by course name
                                let filterCourses = value.courses.filter( course => {
                                    return course.name.toLowerCase().includes(value.search.toLowerCase())
                                });

                                if(value.courses.length > 0){
                                    return filterCourses.map( course => {
                                        return (
                                            <tr key={course.id}>
                                                <td><img src={course.image} alt={course.title} width="50" /></td>
                                                <td>{course.name}</td>
                                                <td>{course.description}</td>
                                                <td>{course.author}</td>
                                                <td>{course.publishDate}</td>
                                                <td>{course.duration}</td>
                                                <td>
                                                    { course.inCart ? (<button onClick={()=> value.removeItem(course.id)} className="btn btn-primary btn-cart">Remove</button>) : (<button onClick={()=> value.addToCart(course.id)} className="btn btn-primary btn-cart">Add To Cart</button>)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                } else {
                                    return (
                                        <tr >
                                            <td colSpan="6" className="text-center">Courses Not Available</td>
                                        </tr>
                                    )
                                }
                            }
                        }
                    </CourseConsumer>                                      
                    </tbody>
                </table>
            </div> 
            <div className="col-sm-3">
                <div className="card">
                    <div className="card-header">
                    Cart
                    </div>
                    <ul className="list-group list-group-flush cart-list-panel">
                    <CourseConsumer>
                        {
                            (value) => {
                                if(value.cart.length){
                                    return value.cart.map( cartItem => {
                                        return (
                                            <li className="list-group-item" key={cartItem.id}>
                                                <img src={cartItem.image} alt={cartItem.name}/> {cartItem.name}
                                            </li>
                                        )
                                    })
                                }else{
                                    return(
                                        <li className="list-group-item">
                                            Your cart is currently empty!
                                        </li>
                                    )
                                }
                            }
                        }
                    </CourseConsumer>
                    </ul>
                </div>
            </div>           
        </div>          
        </main>
    )
}

export default Courses;