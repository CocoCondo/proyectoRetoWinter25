import { useState } from "react";

interface Props {
	onPostCreated: (newPost: Post) => void;
}

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

const PostForm = ({ onPostCreated }: Props) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const nuevoPost: Omit<Post, "id"> = {
			title,
			body,
			userId: 1,
		};
		try {
			const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(nuevoPost),
			});

			if (!res.ok) throw new Error("Error al crear post");

			const data: Post = await res.json();
			onPostCreated(data);
			setTitle("");
			setBody("");
		} catch (err) {
			setError("Error al crear el post");
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="items-center bg-gray-50 rounded-xl p-2">
				<h1 className="text-center text-lg mb-2 font-bold">Crear nuevo post</h1>
				<input
					className="flex-col bg-gray-100 shadow-md rounded-xl p-4"
					type="text"
					placeholder="Título"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<textarea
					className="flex-col bg-gray-100 shadow-md rounded-xl p-4"
					placeholder="Contenido"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
				/>
				<button
					className="flex-col flex bg-indigo-500 shadow-md rounded-xl mb-4 p-2 hover:bg-indigo-600"
					type="submit"
				>
					Guardar
				</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		</form>
	);
};

export default PostForm;
