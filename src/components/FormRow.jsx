// This reusable component returns a form element

function FormRow({type,name,value,handleChangeFunc,labelText}){
    return  <div className="form-row">
    <label htmlFor={name} className='form-label'>{labelText||name}</label>      {/* In case we do not want to keep the label same as 'name', 'labelText' helps with that */}
    <input type={type} id={name} name={name} value={value} onChange={handleChangeFunc} className='form-input' />
</div>
}

export default FormRow;