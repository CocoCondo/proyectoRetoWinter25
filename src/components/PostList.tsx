import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

interface Props {
	onEdit: (post: Post) => void;
	onDelete: (post: Post) => void;
	reloadFlag: number;
}

const PostList = ({ onEdit, onDelete, reloadFlag }: Props) => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((data: Post[]) => setPosts(data))
			.catch(() => console.error("Error al obtener publicaciones"));
	}, [reloadFlag]);

	return (
		<div className="p-1 mb-2 items-center mx-auto max-w-sm flex flex-col shadow-md bg-gray-50">
			<h2 className="text-lg font-bold mb-2">Publicaciones</h2>
			{posts.map((post) => (
				<div className="mb-2 p-2 bg-gray-200 shadow-md gap-2" key={post.id}>
					<h3 className="font-bold">{post.title}</h3>
					<p>{post.body}</p>
					<button
						onClick={() => onEdit(post)}
						className="flex-col bg-indigo-500 shadow-md rounded-xl mb-4 p-2 hover:bg-indigo-600"
					>
						Editar
					</button>
					<button
						onClick={() => onDelete(post)}
						className="flex-col bg-red-500 shadow-md rounded-xl mb-2 p-2 hover:bg-red-600 text-white"
					>
						Borrar
					</button>
				</div>
			))}
		</div>
	);
};

export default PostList;
