import React from 'react'

const Filter = ( {searchText, setSearchText} ) => (
    <input value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
    />
)

export default Filter