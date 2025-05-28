const Person = (props) => {
    console.log(props)
    const { name, phone, toggleDelete }  = props
    console.log(toggleDelete)
    const label = 'delete'
    return (
        <li>{name} : {phone}
            <button onClick={toggleDelete}>{label}</button>
        </li>
    )
}

export default Person

