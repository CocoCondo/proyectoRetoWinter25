import React, { useState } from "react";

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}
interface Props {
	postToEdit: Post;
	onUpdated: (updatedPost: Post) => void;
}
const PostEdit = ({ postToEdit, onUpdated }: Props) => {
	const [title, setTitle] = useState(postToEdit.title);
	const [body, setBody] = useState(postToEdit.body);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const updatedPost: Post = {
			...postToEdit,
			title,
			body,
		};

		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${postToEdit.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedPost),
				}
			);

			if (!res.ok) throw new Error("Error al actualizar");

			const data: Post = await res.json();
			onUpdated(data);
		} catch {
			setError("No se pudo actualizar el post");
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-center text-lg mb-2 font-bold">Editar publicación</h2>
			<input
				className="flex-col bg-gray-100 shadow-md rounded-xl p-4"
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				className="flex-col bg-gray-100 shadow-md rounded-xl p-4"
				value={body}
				onChange={(e) => setBody(e.target.value)}
				required
			/>
			<button
				className="flex-col flex bg-indigo-500 shadow-md rounded-xl mb-4 p-2 hover:bg-indigo-600"
				type="submit"
			>
				Guardar cambios
			</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
};

export default PostEdit;
