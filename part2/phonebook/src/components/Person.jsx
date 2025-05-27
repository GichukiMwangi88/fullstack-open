const Person = (props) => {
    console.log(props)
    const { name, phone}  = props
    return (
        <li>{name} : {phone}</li>
    )
}

export default Person

