/** Mensaje de error reutilizable (se muestra en la interfaz, no solo en consola). */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
      <span>{message}</span>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
