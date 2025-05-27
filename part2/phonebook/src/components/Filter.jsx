// Purpose is to just render the input box and onChange to update the filter value

const Filter = (props) => {
    console.log(props)
    const { filterName, handleFilter } = props
    return (
        <>
        filter shown with <input value={filterName}
                                 placeholder="enter name.." 
                                 onChange={handleFilter} />
        </>  
    )
}

export default Filter
