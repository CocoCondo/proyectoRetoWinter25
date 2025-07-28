import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
interface Props {
	onLogin: () => void;
}

const Login = ({ onLogin }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			onLogin();
		} catch (err) {
			setError("Error al iniciar sesión");
			setEmail("");
			setPassword("");
		}
	};
	return (
		<form onSubmit={handleLogin}>
			<h2 className="text-xl text-center">Iniciar sesión</h2>
			<div className="text-center p-4">
				<input
					className="bg-gray-100 shadow-md rounded-xl p-4"
					type="email"
					placeholder="Correo electrónico"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="text-center p-4">
				<input
					className="bg-gray-100 shadow-md rounded-xl p-4"
					type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<div className="text-center">
				<button
					className="bg-indigo-500 shadow-md rounded-xl mb-4 p-2 hover:bg-indigo-600"
					type="submit"
				>
					Ingresar
				</button>
				{error && (
					<p className="p-3 shadow-md bg-red-100 text-red-600">{error}</p>
				)}
			</div>
		</form>
	);
};

export default Login;
