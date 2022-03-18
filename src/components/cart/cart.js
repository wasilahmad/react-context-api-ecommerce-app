import React from 'react';
import PageTitle from '../page-title/page-title';
import { CourseConsumer } from '../../context';

const Cart = (props) => {
    return (
        <main role="main" className="container">
            <PageTitle text="Cart"></PageTitle>
            <div className="row">
                <div className="col">
                    <table className="table table-courses">                    
                        <tbody>
                        <CourseConsumer>
                            {
                                (value) => {
                                    if(value.cart.length > 0) {
                                        return value.cart.map( course => {
                                            // console.log(course);
                                            return (
                                                <tr key={course.id}>
                                                    <td><img src={course.image} alt={course.title} width="50" /></td>
                                                    <td>{course.name}</td>
                                                    <td>{course.description}</td>
                                                    <td>{course.author}</td>
                                                    <td>{course.publishDate}</td>
                                                    <td>{course.duration}</td>
                                                    <td><button className="btn btn-primary btn-cart" onClick={()=> value.removeItem(course.id)}>Remove</button></td>
                                                </tr>
                                            )
                                        });
                                    } else {
                                        return (
                                            <tr >
                                                <td colSpan="6" className="text-center">
                                                    <h4>Your cart is currently empty :( </h4>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                            }
                        </CourseConsumer>                                      
                        </tbody>
                    </table>
                </div>            
            </div>
        </main>
    )
}

export default Cart;