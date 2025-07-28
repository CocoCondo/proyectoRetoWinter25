import { useState } from "react";
import Login from "./components/Login";
import PostList from "./components/PostList";
import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import type { Post } from "./types/Post";
import PostEdit from "./components/PostEdit";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [view, setView] = useState<"listar" | "crear" | "editar">(
		"listar"
	);
	const [posts, setPosts] = useState<Post[]>([]);
	const [postToEdit, setPostToEdit] = useState<Post | null>(null);
	const [reloadFlag, setReloadFlag] = useState(0);
	const [successMessage, setSuccessMessage] = useState("");
	const [loggedInMessage, setLoggedInMessage] = useState("¡Estás logeado!");

	return (
		<div className="p-4">
			<div className="mx-auto max-w-sm mb-6">
				{isLoggedIn ? (
					<div>
						<Navbar
							onSelect={(action) => {
								setView(action);
								setTimeout(() => setLoggedInMessage(""), 3000);
							}}
						/>
						{successMessage && (
							<div className="mb-4 p-2 text-green-800 bg-green-100 border border-green-400 rounded">
								{successMessage}
							</div>
						)}
						{loggedInMessage && (
							<div className="p-2 mx-auto max-w-sm flex shadow-md bg-green-100 text-green-600">
								{loggedInMessage}
							</div>
						)}
						{view === "crear" && (
							<PostForm
								onPostCreated={(nuevoPost: Post) =>
									setPosts([...posts, nuevoPost])
								}
							/>
						)}
						{view === "listar" && (
							<PostList
								onEdit={(post) => {
									setPostToEdit(post);
									setView("editar");
								}}
								onDelete={(post) => {
									fetch(
										`https://jsonplaceholder.typicode.com/posts/${post.id}`,
										{
											method: "DELETE",
										}
									)
										.then((res) => {
											if (!res.ok) throw new Error("Error al borrar");
											setSuccessMessage("Post eliminado con éxito");
											setReloadFlag((prev) => prev + 1);
											setTimeout(() => setSuccessMessage(""), 3000);
										})
										.catch(() => {
											setSuccessMessage("Error al borrar el post");
											setTimeout(() => setSuccessMessage(""), 3000);
										});
								}}
								reloadFlag={reloadFlag}
							/>
						)}
						{view === "editar" && postToEdit && (
							<PostEdit
								postToEdit={postToEdit}
								onUpdated={() => {
									setView("listar");
									setPostToEdit(null);
									setReloadFlag((prev) => prev + 1);
									setSuccessMessage("Post editado con éxito");
									setTimeout(() => setSuccessMessage(""), 3000);
								}}
							/>
						)}
					</div>
				) : (
					<Login onLogin={() => setIsLoggedIn(true)} />
				)}
			</div>
		</div>
	);
}

export default App;
