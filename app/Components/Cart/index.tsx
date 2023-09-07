const Cart = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gray-600 opacity-75"
        ></div>
      </div>
      <div
        className="fixed inset-y-0 right-0 max-w-full flex"
      >
        <div className="relative w-screen max-w-md">
          <div
            className="h-full flex flex-col bg-white shadow-xl"
          >
            <div className="p-4">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 p-4 text-gray-600 hover:text-gray-900"
              >
                Fechar
              </button>
              <p>TESTE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
