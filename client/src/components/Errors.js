
export default function Errors({ errors }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="alert alert-danger" role="alert">
      <p>The following errors occurred:</p>
      {errors.map(error => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}
