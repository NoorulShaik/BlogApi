import React from 'react'

function Footer() {
    return (
        <footer className='footer'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <p className='foot-heading'>More About Blog Sphere</p>
                        <p>A comprehensive RESTful API backend for a blogging platform, built with Spring Boot. This project powers the Blogging, supporting user authentication, blog management, categories, comments, and more.</p>
                    </div>
                    <div className="col-lg-3">
                        <p className='foot-heading'>Keep Connect</p>
                        <ul>
                            <li><a href="#">facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Youtube</a></li>
                            <li><a href="#">Pinterest</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <p className='foot-heading'>Contact Information</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="fa-white fas fa-home fa-sm"></i> MITS, Angallu, India.
                                </a>
                            </li>
                            <li><a href="tel:+8801759458961"><i className="fa-white fas fa-phone"></i>8106242222</a></li>
                            <li><a href="mailto:eyraforyou@gmail.com"><i className="fa-white fas fa-envelope"></i> eyraforyou@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-ribon">
                <span>&copy; 2026 All Rights reserved by Blog Sphere</span>
                <span>Developed by <span style={{color:"red"}}>Noorul, Dhana, Guru </span></span>
            </div>
        </footer>
    )
}

export default Footer