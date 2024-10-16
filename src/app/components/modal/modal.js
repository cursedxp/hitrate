export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
      {children}
    </div>
  );
}
