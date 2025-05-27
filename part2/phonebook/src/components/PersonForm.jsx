// Purpose is to render a form that allows users to input name and number

const PersonForm = (props) => {
    console.log(props)
    const { name, number, addContact, handleName, handlePhone } = props
    
    return (
        <>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={name}
                                 placeholder="enter name.." 
                                 onChange={handleName}/>
                </div>
                <div>
                    number: <input value={number}
                                   placeholder="enter phone number.."
                                   onChange={handlePhone} />
                </div>
                <div>
                    <button type="submit" >add</button>
                </div>

            </form>
        </>
    )
}

export default PersonForm
