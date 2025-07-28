interface Props {
	onSelect: (action: "listar" | "crear" | "editar") => void;
}

const Navbar = ({ onSelect }: Props) => {
	return (
		<div className="p-2 mb-2 items-center mx-auto max-w-sm flex flex-col shadow-md bg-gray-100">
			<h1 className="text-lg font-bold mb-2">Lista de Posts</h1>
			<div className="flex gap-2">
				<button
					onClick={() => onSelect("listar")}
					className="bg-gray-300 shadow-md rounded-xl mb-4 p-2 hover:bg-gray-400"
				>
					Listar
				</button>
				<button
					onClick={() => onSelect("crear")}
					className="bg-gray-300 shadow-md rounded-xl mb-4 p-2 hover:bg-gray-400"
				>
					Crear
				</button>
				<button
					onClick={() => onSelect("editar")}
					className="bg-gray-300 shadow-md rounded-xl mb-4 p-2 hover:bg-gray-400"
				>
					Editar
				</button>
			</div>
		</div>
	);
};

export default Navbar;
