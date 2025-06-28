const InputField = ({ label, name, value, onChange, type = 'text', error }) => (
  <div style={{ marginBottom: '12px' }}>
    <label style={{ display: 'block' }}>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
    />
    {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
  </div>
)

export default InputField