const FormRowSelect=({labelText,name,handleChangeFunc,value,list})=>{
    return <div className="form-row">
        <label htmlFor={name} className="form-label">
            {labelText||name}
        </label>
        <select name={name} id={name} value={value} onChange={handleChangeFunc} className='form-select'>
            {list.map((ele,ind)=>{
                return <option key={ind} value={ele}>{ele}</option>
            })}
        </select>
    </div>
}

export default FormRowSelect;