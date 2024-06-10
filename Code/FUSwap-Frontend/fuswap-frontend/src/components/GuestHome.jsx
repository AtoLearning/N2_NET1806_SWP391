import axios from "axios";
import React from "react";

const baseURL = "http://localhost:8080/api/v1/guest-home";

export default function UserInfo() {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL, { withCredentials: true }).then((response) => {
            setPosts(response.data);
        }).catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, []);

    if (!posts) return <div>Loading...</div>;


    return (
        <div>
            <table style="border: 3px">
                <thead>
                <tr>
                    <th>PostID</th>
                    <th>Tittle</th>
                    <th>Description</th>
                    <th>isExchange</th>
                    <th>UnitPrice</th>
                    <th>Date</th>
                    <th>Manager</th>
                    <th>Owner</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td>{post.isExchange ? "Yes" : "No"}</td>
                        <td>{post.unitPrice}</td>
                        <td>{post.date}</td>
                        <td>{post.manager}</td>
                        <td>{post.owner}</td>
                        <td>{post.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
