import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addNewComment, deleteBlog, deleteComment, getBlogByBlogId } from '../services/blogServices';
import { BASE_URL } from '../utils/constants';
import { toast } from 'react-toastify';
import { doLogout, getCurrentUserInfo } from '../services/auth';

function Blog() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState("");

    const [comment, setComment] = useState("");
    const [commentStateChange, setCommentStateChange] = useState(1);

    const nav = useNavigate();
    const currentUser = getCurrentUserInfo();

    // check if current user is admin
    const isAdmin = currentUser && currentUser.roles && currentUser.roles.some(role => role.id === 1002);

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.length < 3) {
            toast.error('Comment can not be too short', {
                position: "bottom-center",
                theme: "dark",
            });
        } else {
            addNewComment(blogId, comment)
                .then((data) => {
                    toast.success('Comment added', {
                        position: "bottom-center",
                        theme: "dark",
                    });
                    setComment("");
                    setCommentStateChange(commentStateChange + 1)
                })
                .catch((err) => {
                    console.log(err.response)
                    if (err.response && err.response.status === 403) {
                        doLogout();
                        nav("/login");
                    }
                })
        }
    };

    // handle delete comment
    const handleDeleteComment = (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;

        deleteComment(commentId)
            .then(() => {
                toast.success('Comment deleted', {
                    position: "bottom-center",
                    theme: "dark",
                });
                setCommentStateChange(commentStateChange + 1);
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response && err.response.status === 403) {
                    toast.error('You are not authorized to delete this comment!', {
                        position: "bottom-center",
                        theme: "dark",
                    });
                } else {
                    toast.error('Failed to delete comment', {
                        position: "bottom-center",
                        theme: "dark",
                    });
                }
            });
    };

    // handle delete blog
    const handleDeleteBlog = () => {
        if (!window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) return;

        deleteBlog(blogId)
            .then(() => {
                toast.success('Blog deleted successfully', {
                    position: "bottom-center",
                    theme: "dark",
                });
                nav("/home");
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response && err.response.status === 403) {
                    toast.error('You are not authorized to delete this blog!', {
                        position: "bottom-center",
                        theme: "dark",
                    });
                } else {
                    toast.error('Failed to delete blog', {
                        position: "bottom-center",
                        theme: "dark",
                    });
                }
            });
    };


    useEffect(() => {
        const number = parseInt(blogId, 10);
        if (!Number.isNaN(number)) {
            getBlogByBlogId(blogId)
                .then((data) => {
                    setBlog(data)
                })
                .catch((err) => {
                    console.log(err.response)
                    setError("Blog Not Found");
                })
        } else {
            setError("Error! 404 not found! \n Don't play with URL");
        }

    }, [blogId, commentStateChange])


    // if there is SOME ERROR
    if (error !== "") {
        return <Base>
            <div className='container d-flex justify-content-center align-items-center h-100 mt-5'>
                <div className="alert alert-danger">
                    <h1 className='text-center'>{error}</h1>
                </div>
            </div>
        </Base>
    }


    //checking if the Blog is Empty or NOT
    if (!blog) {
        return <Base>
            <div className='loading border-0'></div>
        </Base>
    }

    const isBlogOwner = currentUser && currentUser.id === blog.user.id;


    //SOB THIK THAKLEI EI CODE GULA KAJ KORBE


    //Date formating
    const addedDate = new Date(blog.addedDate);
    const day = addedDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[addedDate.getMonth()]
    const year = addedDate.getFullYear();
    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDateWithSuffix = `${day}${ordinalSuffix} ${month} ${year}`;

    // Helper function to get the ordinal suffix for the day
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        } else {
            const lastDigit = day % 10;
            switch (lastDigit) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
    }


    return (
        <Base>
            <div className="container py-5">
                <div className='col-lg-8'>
                    <div className="blog">
                        {/* blog image */}
                        {blog.blogImage && <div className="blog-image"><img className='card-img rounded mb-2' src={BASE_URL + "/BlogImages/" + blog.blogImage} alt="Blog" /></div>}
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='display-6 blog-title'>{blog.blogTitle}</p>
                            {(isAdmin || isBlogOwner) && (
                                <button onClick={handleDeleteBlog} className='btn btn-danger btn-sm' title="Delete Blog">
                                    <i className="fa-solid fa-trash"></i> Delete Blog
                                </button>
                            )}
                        </div>
                        <div className='d-flex my-3'>
                            <span className='blog-category me-4'>{blog.category.categoryTitle}</span>
                            <div className='d-flex justify-content-between w-100'>
                                <a href={"#comments"} className='text-decoration-none'><i className="fa-regular fa-comments me-2 "></i>{blog.comments.length}</a>
                                <span className='text-muted'> Published on: {formattedDateWithSuffix}</span>
                            </div>
                        </div>
                        {/* author info */}
                        <Link to={"/user/" + blog.user.id} className="blog-card-auth p-2 text-decoration-none text-dark">
                            <div>
                                <img src={BASE_URL + "/UserImages/" + blog.user.image} alt="User" />
                                {blog.user.name}
                            </div>
                        </Link>

                        <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} className='blog-content text-muted'>
                        </div>
                    </div>
                    <br />
                    <hr />
                    {/* all comments */}
                    <div id='comments' className="blog-comments">
                        <p className='display-6'>All Comments</p>
                        {/* comment card */}

                        {blog.comments.map((comment) => {
                            const isCommentOwner = currentUser && currentUser.id === comment.user.id;
                            return (
                                <div key={comment.commentId} className="comment-card">
                                    <div className='d-flex justify-content-between align-items-start'>
                                        <Link to={"/user/" + comment.user.id} className="author-info text-decoration-none text-dark">
                                            <img src={BASE_URL + "/UserImages/" + comment.user.image} alt="author" className='comment-auth' /> {comment.user.name}
                                        </Link>
                                        {(isAdmin || isCommentOwner) && (
                                            <button onClick={() => handleDeleteComment(comment.commentId)} className='btn btn-outline-danger btn-sm' title="Delete Comment">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                    <div className="comment-text">
                                        {comment.content}
                                    </div>
                                </div>
                            )
                        })}

                        <hr />
                        {/* write your comment */}
                        <div className="write-comment-box">
                            <form onSubmit={handleSubmit}>
                                <textarea onChange={handleChange} value={comment} name="comment" rows={5} placeholder='Write your comment here' className='form-control'></textarea>
                                <input type="submit" className='my-4 btn-lg btn btn-primary' value="Add Comment" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </Base>
    )
}

export default Blog
