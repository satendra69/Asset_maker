// Blog.js
import React from 'react';

const Blog = ({ title, content }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">Blog</h3>
            <p className="mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ut quia quo nostrum optio a veritatis, dolore eaque sequi corporis quibusdam tempora libero eum iste voluptatibus ex facere porro minima provident officia cum non odit consequuntur? Amet, excepturi accusamus. Eius!</p>
        </div>
    );
}

export default Blog;
