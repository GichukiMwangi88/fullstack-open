import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const BirthYearForm = () => {
    const [name, setName] = useState('')
    const [birthYear, setBirthYear] = useState('')

    const [ changeBirthYear ] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [ { query: ALL_AUTHORS }]
    })

    const submit = (event) => {
        event.preventDefault()

        changeBirthYear({ variables: { name: name, setBornTo: Number(birthYear) }})

        setName('')
        setBirthYear('')
    }

    const authors = useQuery(ALL_AUTHORS)

    const authorsList = authors.data.allAuthors
    console.log('Authors List:', authorsList)
    console.log('Authors List data type:', Array.isArray(authorsList))

    const authorNames = authorsList.map(author => author.name)
    console.log('Authors:', authorNames) // -- list of author names

    const options = authorNames.map(author => ({
        value: author,
        label: author
    }))

    console.log('Options', options) // --> Options object

    const handleMenuOpen = () => {
        console.log('Menu opened!')
    }

    const [selectedOption, setSelectedOption] = useState(null)

    const handleChange = (selected) => {
        setSelectedOption(selected)
        setName(selected.value)
        console.log('Selected:', selected.value)
    }


    return (
        <div>
            <h2>Set Birth Year</h2>
            <form onSubmit={submit}>
                <div>
                    <Select
                        onMenuOpen={handleMenuOpen}
                        placeholder='Select author...'
                        onChange={handleChange}
                        value={selectedOption}
                        options={options}
                    />
                </div>
                <div>
                    born <input value={birthYear}
                                onChange={({ target }) => setBirthYear(target.value)}
                        />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthYearForm
